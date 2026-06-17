"use client";
import React from "react";
import { XIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { Input } from "../../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
// import { FooterSection } from "../components/layout/FooterSection";
// import { HeaderSection } from "../components/layout/HeaderSection";

const Dashboard = () => {
  const navTabs = [
    { id: "address", label: "Address", active: true },
    { id: "orders", label: "Orders", active: false },
    { id: "communication", label: "Communication/watchlist", active: false },
  ];

  const personalInfoFields = [
    {
      id: "firstName",
      label: "First Name",
      type: "text",
      colSpan: "col-span-1",
    },
    { id: "lastName", label: "Last Name", type: "text", colSpan: "col-span-1" },
    {
      id: "email",
      label: "Email Adderess",
      type: "email",
      colSpan: "col-span-1",
      defaultValue: "",
      bgColor: "bg-[#c8c3c3]",
    },
    {
      id: "mobile",
      label: "Mobile Number",
      type: "tel",
      colSpan: "col-span-1",
    },
    { id: "dob", label: "Date Of Birth", type: "date", colSpan: "col-span-1" },
  ];

  const shippingAddressFields = [
    { id: "name", label: "Name", type: "text", colSpan: "col-span-1" },
    {
      id: "mobile",
      label: "Mobile Number",
      type: "tel",
      colSpan: "col-span-1",
    },
    { id: "address1", label: "Address 1", type: "text", colSpan: "col-span-1" },
    { id: "address2", label: "Address 2", type: "text", colSpan: "col-span-1" },
    { id: "city", label: "City", type: "text", colSpan: "col-span-1" },
    { id: "pincode", label: "pincode", type: "text", colSpan: "col-span-1" },
    { id: "country", label: "Country", type: "text", colSpan: "col-span-1" },
    {
      id: "region",
      label: "Region/State/Province",
      type: "text",
      colSpan: "col-span-1",
    },
  ];

  return (
    <div
      className="bg-white flex flex-row justify-center w-full"
      data-model-id="60572:9770"
    >
      <div className="bg-white w-full max-w-[1440px] relative flex flex-col">
        {/* <HeaderSection /> */}

        <main className="w-full bg-[#fbf1f0] border-t-[5px] border-[#8c3131] flex flex-col">
          <Card className="mx-4 sm:mx-8 md:mx-[73px] mt-6 md:mt-9 rounded-[5px] bg-m-3refprimaryprimary-90 border-0">
            <CardContent className="p-0 relative">
              <div className="relative w-full sm:w-[157px] h-auto sm:h-[209px] sm:left-1 rounded-[5px] sm:float-left">
                <div className="relative w-full h-44 sm:w-[126px] mx-auto sm:mx-0 sm:top-[18px] sm:left-[19px] rounded-[5px] bg-[url(https://c.animaapp.com/DpZTXc8l/img/background.svg)] bg-cover bg-[50%_50%]" />
              </div>

              <button
                className="absolute w-6 h-6 top-[15px] right-[15px] flex items-center justify-center"
                type="button"
                aria-label="Close"
                title="Close"
              >
                <XIcon className="w-[18px] h-5" />
              </button>

              <div className="pt-[18px] px-4 sm:pl-[195px] sm:pr-[20px] pb-[20px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4">
                  {personalInfoFields.map((field) => (
                    <div key={field.id} className={field.colSpan}>
                      <label
                        htmlFor={field.id}
                        className="block w-full mb-1 font-medium text-xs text-black font-['Montserrat',Helvetica]"
                      >
                        {field.label}
                      </label>
                      <Input
                        id={field.id}
                        type={field.type}
                        className={`h-8 rounded-none ${
                          field.bgColor || "bg-white"
                        } border-[#654f4f]`}
                        defaultValue={field.defaultValue}
                      />
                    </div>
                  ))}
                </div>

                <Button className="mt-6 h-9 w-full sm:w-auto bg-m-3refprimaryprimary-30 hover:bg-m-3refprimaryprimary-40 rounded-none">
                  <span className="font-medium text-white text-base font-['Montserrat',Helvetica]">
                    Save Changes
                  </span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs
            defaultValue="address"
            className="mt-8 mx-4 sm:mx-8 md:mx-[68px]"
          >
            <TabsList className="w-full bg-transparent h-auto p-0 justify-between border-b border-gray-300 overflow-x-auto flex-nowrap">
              {navTabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={`min-w-[100px] sm:min-w-0 sm:w-[233px] h-[30px] text-sm sm:text-base font-normal font-['Montserrat',Helvetica] rounded-none border-b-2 border-transparent data-[state=active]:border-m-3refprimaryprimary-30 data-[state=active]:text-m-3refprimaryprimary-30 data-[state=inactive]:text-black pb-2`}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="address" className="mt-8">
              <h2 className="text-base font-normal text-black font-['Montserrat',Helvetica] mb-4">
                Shipping Address
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4">
                {shippingAddressFields.map((field) => (
                  <div key={field.id} className={field.colSpan}>
                    <label
                      htmlFor={`shipping_${field.id}`}
                      className="block w-full mb-1 font-medium text-xs text-black font-['Montserrat',Helvetica]"
                    >
                      {field.label}
                    </label>
                    <Input
                      id={`shipping_${field.id}`}
                      type={field.type}
                      className="h-8 rounded-none bg-white border-[#654f4f]"
                    />
                  </div>
                ))}
              </div>

              <Button className="mt-6 h-9 w-full sm:w-auto bg-m-3refprimaryprimary-30 hover:bg-m-3refprimaryprimary-40 rounded-none">
                <span className="font-medium text-white text-base font-['Montserrat',Helvetica]">
                  Save Changes
                </span>
              </Button>
            </TabsContent>

            <TabsContent value="orders">
              <div className="py-8">
                <p className="text-center">Orders content will go here</p>
              </div>
            </TabsContent>

            <TabsContent value="communication">
              <div className="py-8">
                <p className="text-center">
                  Communication/watchlist content will go here
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="mt-8 mx-4 sm:mx-8 md:mx-[68px]" />

          <div className="flex justify-center my-8 md:my-12">
            <Button className="w-full mx-4 sm:w-52 h-9 bg-m-3refprimaryprimary-30 hover:bg-m-3refprimaryprimary-40 rounded-none">
              <span className="font-medium text-white text-base font-['Montserrat',Helvetica]">
                Sign Out
              </span>
            </Button>
          </div>
        </main>

        {/* <FooterSection /> */}
      </div>
    </div>
  );
};

export default Dashboard;
