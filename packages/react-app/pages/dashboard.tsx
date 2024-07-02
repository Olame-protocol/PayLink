import Layout from "@/components/Layout";
import Section from "@/components/Section";
import InvoiceList from "@/components/dashboard/InvoiceList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabList = ["Invoice", "Payment link"];

export default function Dashboard() {
  return (
    <Layout className="bg-green-petrolium">
      <Section className="mt-32 rounded-lg bg-forest px-36 py-16 max-md:px-5">
        <Tabs defaultValue={tabList[0].toLowerCase()}>
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
            <InvoiceList />
          </TabsContent>
          <TabsContent value={tabList[1].toLowerCase()}>{/* <AddProductFrom /> */}</TabsContent>
        </Tabs>
      </Section>
    </Layout>
  );
}
