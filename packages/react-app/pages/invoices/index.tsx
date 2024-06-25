import Section from "../../components/Section";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddClientForm from "@/components/AddClientForm";
import AddProductFrom from "@/components/AddProductFrom";
import CreateInvoiceForm from "@/components/createInvoice";
import ClientList from "@/components/ClientList";
import { useState } from "react";
import ProductsList from "@/components/ProductList";
import InvoiceList from "@/components/InvoiceList";

export type Tab = "fixed" | "global";

const tabList = ["Add client", "Add product", "Create invoice"];

export type SupabaseLinksRecord = {
  amount?: string;
  description: string;
  created_at: string;
  has_expired: boolean;
  id: number;
  owner: string;
  payment_link_id: string;
  transaction_hash: string;
};

export default function Index() {
  const [currentTab, setCurrentTab] = useState(tabList[0]);

  return (
    <Layout className="bg-green-petrolium pb-20">
      <Section className="mt-32 rounded-lg bg-forest">
        <div className="flex justify-between gap-8 px-5 py-5 lg:px-36 lg:py-16">
          <div className="mx-auto w-full text-left">
            <div className="flex flex-col">
              <div className="mb-12 flex flex-col gap-5">
                <h2 className="text-xl font-semibold text-green-petrolium md:font-black lg:text-[2.5rem]">Add a client</h2>
                <p className="-mt-3 text-sm font-thin text-white md:-mt-0 md:text-base md:font-normal">Track your clients and invoices</p>
              </div>

              <div>
                <Tabs onValueChange={(tab) => setCurrentTab(tab)} defaultValue={tabList[0].toLowerCase()}>
                  <TabsList className="mb-5 flex h-fit justify-start rounded-lg bg-white/[8%] p-3 text-lg max-md:overflow-x-auto lg:text-xl">
                    {tabList.map((tab) => (
                      <TabsTrigger
                        key={tab}
                        value={tab.toLowerCase()}
                        className="rounded-sm px-3 py-2 text-xs font-normal text-white data-[state=active]:bg-green-petrolium data-[state=active]:text-forest md:mr-4 md:rounded-lg md:text-base lg:px-12 lg:py-5"
                      >
                        {tab}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <TabsContent value={tabList[0].toLowerCase()}>
                    <AddClientForm />
                  </TabsContent>
                  <TabsContent value={tabList[1].toLowerCase()}>
                    <AddProductFrom />
                  </TabsContent>
                  <TabsContent value={tabList[2].toLowerCase()}>
                    <CreateInvoiceForm />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="mb-10 mt-16 rounded-2xl bg-forest">
        <div className="flex justify-between gap-8 px-5 py-5 lg:px-36 lg:py-16">
          <div className="mx-auto w-full text-left">
            <div className="w-full overflow-x-auto">
              {currentTab.toLowerCase() === tabList[0].toLowerCase() && <ClientList />}
              {currentTab.toLowerCase() === tabList[1].toLowerCase() && <ProductsList />}
              {currentTab.toLowerCase() === tabList[2].toLowerCase() && <InvoiceList />}
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
