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



function StateSelector() {
    return (
      <Field label="State" required>
        <NativeSelect.Root>
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

function StoreSelector({stores}) {
    return (
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
    );
}



function AddressForm({formRef}) {
    return (
    <VStack spacing={4} align="stretch" width="60%">
      {/* House Number + Street */}
      <HStack spacing={4}>
        <Field label="House Number" flex="1">
          <Input
            placeholder="123"
            onChange={(e) => (formRef.current.houseNumber = e.target.value)}
          />
        </Field>
        <Field label = "Street" flex="3">
          <Input
            placeholder="Main St"
            onChange={(e) => (formRef.current.street = e.target.value)}
          />
        </Field>
      </HStack>

      {/* Apartment Number (Optional) */}
      <Field label="Apartment Number">
        <Input
          onChange={(e) => (formRef.current.aptNum = e.target.value)}
        />
      </Field>

      {/* City + Zipcode */}
      <HStack spacing={4}>
        <Field label="City" flex="2">
          <Input
            placeholder="Los Angeles"
            onChange={(e) => (formRef.current.city = e.target.value)}
          />
        </Field>
        <Field label="Zipcode" flex="1">
          <Input
            placeholder="90210"
            type="number"
            onChange={(e) => (formRef.current.zipcode = e.target.value)}
          />
        </Field>
      </HStack>

      {/* State Dropdown */}
        <StateSelector/>
    </VStack>
  );
}

function CurrentContributionForm() {
    return (
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
    );
}

function ShippingThresholdForm() {
    return (
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
    );
}

function TitleForm() {
    return (
      <Field label="Title" required>
        <Input variant="outline" />
      </Field>
    );
}
function DescriptionForm() {
    return (
      <Field label="Description" required>
        <Textarea
            placeholder="Enter a brief description! (ie: Quick pickup near campus)" 
            variant="outline" 
            size="xl"/>
      </Field>
    );
}
export default function AddModalListing() {
    const zipcode = 60126;


    const formRef = useRef({
        listingId: -1, // TODO: This should be server side
        hostId: -1, // TODO: This should be from auth
        store: "",
        title: "",
        description: "",
        minPurchaseRequired: 0.0,
        currentTotal: 0.0,
        createdAt: 10, // TODO: This should be server side
        houseNumber: "123",
        street: "Main St.",
        aptNum: null,
        city: "Los Angeles",
        zip: 90210
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
                boxShadow="lg"
            >
                
                    <DialogHeader>
                    <DialogTitle>Create A New Listing</DialogTitle>
                    </DialogHeader>

                <DialogBody width="full">
                        <VStack gap="10" width="full" align="start">
                            <TitleForm/>
                            <DescriptionForm/> 
                            <Flex gap="10" justifyContent="start">
                                <StoreSelector stores={stores}/>
                                <CurrentContributionForm/>
                                <ShippingThresholdForm/>
                            </Flex>
                            <AddressForm formRef={formRef}/>
                        </VStack>
                </DialogBody>
                <Button onClick={() => alert(JSON.stringify(formRef.current))}>Submit</Button>
            </DialogContent>
        </DialogRoot>
    );
}
