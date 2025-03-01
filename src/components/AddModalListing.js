"use client"
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

function USDNumberInput() {
    return (
      <NumberInput
        precision={2}
        step={0.01}
        defaultValue={0}
        min={0}
        format={(val) => `$${Number(val).toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
        parse={(val) => val.replace(/^\$/, "").replace(/,/g, "")}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    );
}
export default function AddModalListing() {
    const zipcode = 60126;


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
                minW="85%"
                height="auto"
                minH="85%"
                p={6}
                borderRadius="md"
                boxShadow="lg"
            >
                
                    <DialogHeader>
                    <DialogTitle>Create A New Listing</DialogTitle>
                    </DialogHeader>



                <DialogBody width="full">
                    <VStack gap="10" width="full" align="start">
                      <Field label="Title" required>
                        <Input variant="outline" />
                      </Field>

                      <Field label="Description" required>
                        <Textarea
                            placeholder="Enter a brief description! (ie: Quick pickup near campus)" 
                            variant="outline" 
                            size="xl"/>
                      </Field>
                    
                    <Flex gap="10" justifyContent="start">
                      <Field label="Store" required>
                        <NativeSelect.Root>
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

                      <Field label="Current Contribution" helperText="Enter the current (pre-tax) value" required>
                        <NumberInputRoot 
                            step={0.01}
                            formatOptions={{
                                      style: "currency",
                                      currency: "USD",
                                    }}
                        >
                          <NumberInputLabel />
                          <NumberInputField />
                        </NumberInputRoot>
                      </Field>

                      <Field label="Free Shipping Threshold" required>
                        <NumberInputRoot 
                            step={0.01}
                            formatOptions={{
                                      style: "currency",
                                      currency: "USD",
                                    }}
                        >
                          <NumberInputLabel />
                          <NumberInputField />
                        </NumberInputRoot>
                      </Field>
                    </Flex>
                    </VStack>
                </DialogBody>

            </DialogContent>
        </DialogRoot>
    );
}
