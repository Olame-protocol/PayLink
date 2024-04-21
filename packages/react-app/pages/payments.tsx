import LinkCard from "@/components/ui/payLink/cards/LinkCard";
import Section from "../components/Section";
import Copy from "@/components/ui/payLink/icons/Copy";
import { useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { truncateString } from "@/components/utils/utils";

type Tab = 'fixed' | 'global';
type Tab2 = 'Paid' | 'Unpaid';

export default function Payments() {
    const [copied, setCopied] = useState(false);
    const [copiedLink, setCopiedLink] = useState("");
    const [activeTab, setActiveTab] = useState<Tab>('fixed');
    const [activeLinkTab, setActiveLinkTab] = useState<Tab2>('Paid');
    const generatedLink = "https://react-icons.github.io/react-icons/search/#q=dash"

    const onCopyToClickboard = async (link: string) => {
        setCopied(true);
        setCopiedLink(link);
        await navigator.clipboard.writeText(link);
        setTimeout(() => {
            setCopied(false);
            setCopiedLink("");
        }, 1500);
    };

    const onViewLink = (endPoint: string) => {
        window.open(`${endPoint}`);
    };

    return (
        <div>
            <Section>
                <div className="flex justify-between gap-8">
                    <div className="text-left w-1/2">
                        <div className="flex flex-col">
                            <h2 className="font-medium text-2xl pb-3"> Create a payment link</h2>
                            <div className="flex justify-start mb-4">
                                <button
                                    className={`px-4 py-2 mr-4 text-base font-semibold rounded ${activeTab === 'fixed' ? 'bg-blue-500 text-gray-50 ' : 'bg-gray-200 text-gray-700'
                                        }`}
                                    onClick={() => setActiveTab('fixed')}
                                >
                                    Fixed
                                </button>
                                <button
                                    className={`px-4 py-2 mr-4 text-base font-semibold rounded  ${activeTab === 'global' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                                        }`}
                                    onClick={() => setActiveTab('global')}
                                >
                                    Global
                                </button>
                            </div>
                            {activeTab === 'fixed' && (
                                <>
                                    <form className="flex flex-col gap-2 py-2">
                                        <input type="text" name="text" placeholder="Service" className="outline-none py-3 px-4 rounded-lg border-2 boder-gray-400  " />
                                        <div className="flex gap-2 w-full">
                                            <input type="number" name="amount" placeholder="0.0cUSD" className="w-5/5 outline-none py-3 px-4 rounded-lg border-2 boder-gray-400  " />
                                            <button className="w-3/5 bg-prosperity text-gray-900 py-3 px-4 rounded-lg font-medium text-lg"> Generate link</button>
                                        </div>
                                    </form>
                                    <div className="flex gap-3 py-3 px-4 rounded-lg border-2 boder-gray-400 justify-between">
                                        <p className="text-velix-primary dark:text-velix-dark-white text-blue-500 text-base underline">
                                            {truncateString(generatedLink)}
                                        </p>
                                        <div className="flex gap-2">
                                            {copied &&
                                                generatedLink.toLowerCase() === copiedLink.toLowerCase() ? (
                                                <IoCheckmarkDoneSharp className="text-velix-primary w-5 h-5 dark:text-velix-icon-dark" />
                                            ) : (
                                                <Copy
                                                    role="button"
                                                    onClick={() => onCopyToClickboard(generatedLink)}
                                                    className="text-velix-primary w-5 h-5 cursor-pointer dark:text-velix-icon-dark"
                                                />
                                            )}
                                            <FaArrowUpRightFromSquare
                                                onClick={() => onViewLink(generatedLink)}
                                                role="button"
                                                className="text-velix-primary w-5 h-5 cursor-pointer dark:text-velix-icon-dark"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            {activeTab === 'global' && (
                                <>
                                    <form className="flex flex-col gap-2 py-2">
                                        <div className="flex gap-2 w-full">
                                            <input type="text" name="Purpose" placeholder="Purpose" className="outline-none py-3 px-4 rounded-lg border-2 boder-gray-400  " />
                                            <button className="w-3/5 bg-prosperity text-gray-900 py-3 px-4 rounded-lg font-medium text-lg"> Generate link</button>
                                        </div>
                                    </form>
                                    <div className="flex gap-3 py-3 px-4 rounded-lg border-2 boder-gray-400 justify-between">
                                        <p className="text-velix-primary dark:text-velix-dark-white text-blue-500 text-base underline">
                                            {truncateString(generatedLink)}
                                        </p>
                                        <div className="flex gap-2">
                                            {copied &&
                                                generatedLink.toLowerCase() === copiedLink.toLowerCase() ? (
                                                <IoCheckmarkDoneSharp className="text-velix-primary w-5 h-5 dark:text-velix-icon-dark" />
                                            ) : (
                                                <Copy
                                                    role="button"
                                                    onClick={() => onCopyToClickboard(generatedLink)}
                                                    className="text-velix-primary w-5 h-5 cursor-pointer dark:text-velix-icon-dark"
                                                />
                                            )}
                                            <FaArrowUpRightFromSquare
                                                onClick={() => onViewLink(generatedLink)}
                                                role="button"
                                                className="text-velix-primary w-5 h-5 cursor-pointer dark:text-velix-icon-dark"
                                            />
                                        </div>
                                    </div></>
                            )}
                        </div>


                    </div>
                    <div className="w-1/2">
                        <div className="flex flex-col">
                            <h2 className="font-medium text-2xl pb-3"> Recently generated links</h2>
                            <div className="flex justify-start mb-4">
                                <button
                                    className={`px-4 py-2 mr-4 text-base font-semibold rounded ${activeLinkTab === 'Paid' ? 'bg-blue-500 text-gray-50 ' : 'bg-gray-200 text-gray-700'
                                        }`}
                                    onClick={() => setActiveLinkTab('Paid')}
                                >
                                    Paid
                                </button>
                                <button
                                    className={`px-4 py-2 mr-4 text-base font-semibold rounded  ${activeLinkTab === 'Unpaid' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                                        }`}
                                    onClick={() => setActiveLinkTab('Unpaid')}
                                >
                                    Unpaid
                                </button>
                            </div>
                            {activeLinkTab === 'Paid' && (
                                <div className="flex flex-col  gap-2">
                                    <div className="flex flex-row items-center">
                                        <p className="text-velix-primary dark:text-velix-dark-white text-blue-500 text-base underline">
                                            {truncateString(generatedLink)}
                                        </p>
                                        <span className="text-gray-50 font-medium rounded bg-orange-500 py-2 px-3">Fixed</span>
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <p className="text-velix-primary dark:text-velix-dark-white text-blue-500 text-base underline">
                                            {truncateString(generatedLink)}
                                        </p>
                                        <span className="text-gray-50 font-medium rounded bg-green-500 py-2 px-3">Gobal</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    )
}