import React from "react"
import { Tabs, TabsList, TabsTrigger } from "../atoms/tabs"
import { TabsContent } from "@radix-ui/react-tabs"
import { Form } from "react-hook-form"

const Search: React.FC = () => {
  return (
    <div className="text-md bg-transparent">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="hotel">Hotel</TabsTrigger>
          <TabsTrigger value="flight">Flight</TabsTrigger>
          <TabsTrigger value="homestay">Homestay</TabsTrigger>
          <TabsTrigger value="transport">Transportation</TabsTrigger>
          <TabsTrigger value="rent-car">Rent car</TabsTrigger>
        </TabsList>
        <TabsContent value="hotel">
          <Form></Form>
        </TabsContent>
        <TabsContent value="flight">Change your password here.</TabsContent>
        <TabsContent value="homestay">Change your password here.</TabsContent>
        <TabsContent value="transport">Change your password here.</TabsContent>
        <TabsContent value="rent-car">Change your password here.</TabsContent>
      </Tabs>
    </div>
  )
}

export default Search
