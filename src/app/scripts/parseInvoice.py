from langchain.agents import Tool
from langchain.chat_models import ChatOpenAI
from langchain import LLMChain, PromptTemplate
import openai
import pytesseract
from PIL import Image
import firebase_admin
from firebase_admin import credentials, storage
import os
from dotenv import load_dotenv
from firebase_functions import firestore_fn, https_fn
from firebase_admin import initialize_app, firestore, credentials, storage
import google.cloud.firestore

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY

def extract_image_info(image_name):
    pytesseract.pytesseract.tesseract_cmd = "C:/Program Files/Tesseract-OCR/tesseract.exe"

    cred = credentials.Certificate("hackillinois25/service_account_key.json")
    firebase_admin.initialize_app(cred, {
        'storageBucket': 'hack-illinois-2025.firebasestorage.app'
    })
    bucket = storage.bucket()
    blob = bucket.blob(f"invoices/{image_name}")
    path = f"src/app/scripts/data/{image_name}"
    blob.download_to_filename(path)
    text = pytesseract.image_to_string(Image.open(path))
    return text

def run_LLM(image_text):
    prompt_template = PromptTemplate(
        input_variables=["image_text"],
        template = """
        You are an invoice parser that extracts information from text obtained from an image. 

        You are given unorganized raw text. Your task is to extract the following information from the text and format it in a json
            Status: 200,
            Items: A list of item names (paraphrase item name if longer than 50 characters) and their prices stored as a tuple with 2 elements. Here is an example : [["item1", 9.99], ["item2", 4.99]]
            Coupon savings: If there are coupon savings, put -x.xx where x.xx is how much the coupon saved. It has to be negative in the end
            Sub-total : The sum of all prices minus coupon savings, formula is sum of all items - abs(coupon savings). If sub-total exists in the text already, your new calculated sub-total overrides it
            Taxes and fees: Collect all miscelleneous fees and taxes and add them together put it here,
            Grand total: The sub-total plus taxes and fees minus coupon savings
        Format prices like x.xx with no dollar signs and return them as a float. It is imperative that the keys of the dictionary match exactly what I gave you.
        It is imperative that you extract the information accurately since precision is of the utmost importance.
        Continue to do checks making sure all items minus abs(coupon savings) add to the sub-total and the sub-total plus taxes adds up to the grand total.
        If there are gaps in the math, retry your thought process until you are sure the gaps are due to insufficient information from the input.
        
        If so, then you would just return a json with
        Status: 400

        Here is the data:
        {image_text}

        Give only the json as the output.
        """
    )
    
    llm = ChatOpenAI(temperature=0, openai_api_key=OPENAI_API_KEY)
    chain = LLMChain(llm=llm, prompt=prompt_template)
    output = chain.run({"image_text": image_text})
    return output

@https_fn.on_request()
def parseInvoice(req):
    image_name = req.args.get("image_name")
    if not image_name:
        return https_fn.Response("Missing 'image_name' query parameter.", status=400)
    try:
        image_text = extract_image_info(image_name)
        parsed_output = run_LLM(image_text)
        return https_fn.Response(parsed_output, status=200, mimetype="application/json")
    except Exception as e:
        print(f"Error processing invoice for {image_name}: {e}")
        return https_fn.Response(f"Error processing invoice: {e}", status=500)

