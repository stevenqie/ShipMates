import {
        Button,
        DialogRoot, 
        DialogTitle, 
        DialogTrigger,
        DialogContent, 
        DialogHeader, 
        DialogBody, 
        Input,
        NativeSelect,
        Textarea,
        HStack,
        VStack,
        Flex,
        createListCollection,
} from "@chakra-ui/react";

import { Field } from "@/components/ui/field"
import {
        NumberInputRoot,
        NumberInputLabel,
        NumberInputField,
} from "@/components/ui/number-input"

import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select"
import { useRef } from "react";

const stateAbbreviations = [
            "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
            "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
            "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
            "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
            "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
          ];


async function sendForm(formValues) {
    console.log("Form values: " + JSON.stringify(formValues));
    try {
        const response = await fetch("/api/listing", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formValues),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        alert("Ok!");
    } catch (error) {
        alert("Error occurred: " + error);   
    }
}

function StateSelector({formRef}) {
    return (
      <Field label="State" required>
        <NativeSelect.Root onChange={(e) => {formRef.current.location.state = e.target.value}}>
          <NativeSelect.Field>
            {stateAbbreviations.map((store, index) => (
              <option key={index} value={store}>
                {store}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Field>
    );
}

function StoreSelector({stores, formRef}) {
    return (
      <Field label="Store" required>
        <NativeSelect.Root onChange={(e) => {formRef.current.store = e.target.value}}>
          <NativeSelect.Field>
            {stores.map((store, index) => (
              <option key={index} value={store}>
                {store}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Field>
    );
}



function AddressForm({formRef}) {
    return (
    <VStack spacing={4} align="stretch" width="60%">
      {/* House Number + Street */}

      <Field label="Address Line 1">
        <Input
          onChange={(e) => (formRef.current.location.street= e.target.value)}
        />
      </Field>

      {/* City + Zipcode */}
      <HStack spacing={4}>
        <Field label="City" flex="2">
          <Input
            placeholder="Los Angeles"
            onChange={(e) => (formRef.current.location.city = e.target.value)}
          />
        </Field>
        <Field label="Zipcode" flex="1">
          <Input
            placeholder="90210"
            type="number"
            onChange={(e) => (formRef.current.location.zip = e.target.value)}
          />
        </Field>
      </HStack>

      {/* State Dropdown */}
        <StateSelector formRef={formRef}/>
    </VStack>
  );
}

function CurrentContributionForm({formRef}) {
    return (
        <Field label="Current Contribution" helperText="Enter the current (pre-tax) value" required>
            <NumberInputRoot 
                step={0.01}
                formatOptions={{
                          style: "currency",
                          currency: "USD",
                        }}
                onValueChange={(e)=>{formRef.current.currentTotal=e.valueAsNumber}}
            >
              <NumberInputLabel />
              <NumberInputField />
            </NumberInputRoot>
          </Field>
    );
}

function ShippingThresholdForm({formRef}) {
    return (
        <Field label="Free Shipping Threshold" required>
        <NumberInputRoot 
            step={0.01}
            formatOptions={{
                      style: "currency",
                      currency: "USD",
                    }}
                onValueChange={(e)=>{formRef.current.minPurchaseRequired = e.target.value}}
        >
          <NumberInputLabel />
          <NumberInputField />
        </NumberInputRoot>
        </Field>
    );
}

function TitleForm({formRef}) {
    return (
      <Field label="Title" required>
        <Input variant="outline" onChange={(e) => {formRef.current.title = e.target.value}}/>
      </Field>
    );
}
function DescriptionForm({formRef}) {
    return (
      <Field label="Description" required>
        <Textarea
            placeholder="Enter a brief description! (ie: Quick pickup near campus)" 
            variant="outline" 
            size="xl"
            onChange={(e) => {formRef.current.description = e.target.value}}
        />
      </Field>
    );
}
export default function Listing({uname}) {
    const zipcode = 60126;

    const formRef = useRef({
        listingID: -1, // TODO: This should be server side
        hostID: uname, // TODO: This should be from auth
        store: "",
        title: "",
        status: "active",
        description: "",
        minPurchaseRequired: 0.0,
        currentTotal: 0.0,
        createdAt: 10, // TODO: This should be server side
        location: {
            city: "",
            state: "",
            street: "",
            zip: ""
        }
    });
    const stores = ["Amazon", "Macys", "Uniqlo", "Walmart"];
    // Title text box
    // Description Text Box
    // Minimum Shipping Threshold
    // Current shipping threshold
    return (
        <DialogRoot size="cover" placement="center" motionPreset="slide-in-bottom">
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Open Dialog
                </Button>
            </DialogTrigger>


            <DialogContent
                position="fixed"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                display="flex"
                justifyContent="center"
                alignItems="center"
                bg="white"
                width="auto"
                minW="55%"
                height="auto"
                minH="85%"
                p={6}
                borderRadius="md"
                bxShadow="lg"
            >
                
                    <DialogHeader>
                    <DialogTitle>Create A New Listing</DialogTitle>
                    </DialogHeader>

                <DialogBody width="full">
                        <VStack gap="10" width="full" align="start">
                            <TitleForm formRef={formRef}/>
                            <DescriptionForm formRef={formRef}/> 
                            <Flex gap="10" justifyContent="start">
                                <StoreSelector stores={stores} formRef={formRef}/>
                                <CurrentContributionForm formRef={formRef}/>
                                <ShippingThresholdForm formRef={formRef}/>
                            </Flex>
                            <AddressForm formRef={formRef}/>
                        </VStack>
                </DialogBody>
                <Button onClick={() => {sendForm(formRef.current)} }> </Button>
            </DialogContent>
        </DialogRoot>
    );
}
