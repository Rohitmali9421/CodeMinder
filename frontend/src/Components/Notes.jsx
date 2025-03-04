import { useState } from "react";
import { Search} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Editor } from "@tinymce/tinymce-react";
import { FiLink } from "react-icons/fi";
import { FiFileText } from "react-icons/fi";

export default function Notes() {
    const [activeTab, setActiveTab] = useState("questions");
    const [noteContent, setNoteContent] = useState("");
    const [noteName, setNoteName] = useState("Approach");

    const handleSave = () => {
        console.log("Saved Content:", noteContent);
    };

    return (
        <div className="w-full p-4 border-none shadow-sm lg:mb-8 overflow-auto no-scrollbar dark:bg-dark-900 dark:border-darkBorder-800">
            <section className="flex flex-col gap-4">

                {/* Search & Navigation */}
                <div className="flex justify-between items-center gap-4">
                    <div className="relative flex-grow max-w-md">
                        <Search className="absolute w-4 h-4 text-gray-400 right-3 top-1/2 -translate-y-1/2 cursor-pointer" />
                        <input
                            placeholder="Search a question"
                            className="w-full p-2 pr-10 text-gray-800 bg-white border rounded-md dark:border-darkBorder-700 placeholder-gray-400 dark:bg-dark-900 dark:text-white focus:outline-none"
                            type="text"
                        />
                    </div>
                    
                </div>

                {/* Main Content - Sidebar & Notes */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 h-[80vh]">

                    {/* Sidebar */}
                    <aside className="flex flex-col bg-white border rounded-md p-3 dark:bg-darkBox-900 dark:border-darkBorder-700">
                        <nav>
                            <div className="flex">
                                <Button
                                    className={`w-1/2 py-2 ${activeTab === "questions" ? "bg-gray-200 dark:bg-darkBox-700" : "bg-gray-50 dark:bg-darkBox-800"}`}
                                    onClick={() => setActiveTab("questions")}
                                >
                                    Question Notes
                                </Button>
                                <Button
                                    className={`w-1/2 py-2 ${activeTab === "general" ? "bg-gray-200 dark:bg-darkBox-700" : "bg-gray-50 dark:bg-darkBox-800"}`}
                                    onClick={() => setActiveTab("general")}
                                >
                                    General Notes
                                </Button>
                            </div>
                            <div className="my-3 border-t border-gray-300 dark:border-darkBorder-700"></div>
                            <div className="p-2 text-center dark:text-darkText-300">No Questions found</div>
                        </nav>
                    </aside>

                    {/* Notes Content with TinyMCE */}
                    <div className="flex-grow bg-white border rounded-md p-3 gap-3 min-h-96  flex flex-col dark:bg-darkBox-900 dark:border-darkBorder-700 overflow-auto">
                        <div className="flex justify-end w-full gap-2">
                            <button
                                className="flex items-center gap-1 px-2 py-1 text-sm text-white bg-red-500 rounded-md"
                                onClick={() => setNoteContent("")} // Clears the editor
                            >
                                Cancel
                            </button>
                            <button
                                className="flex items-center gap-1 px-2 py-1 text-sm text-white bg-blue-600 rounded-md"
                                onClick={handleSave} // Logs content on save
                            >
                                Save
                            </button>
                        </div>
                        <div className="relative flex flex-col gap-2 md:gap-4 md:flex-row">
                            <div className="sm:w-[40%] gap-4 p-[5px] flex items-center">
                                <div className="w-[5%]">
                                    <FiFileText/>
                                </div>
                                <h3 className="text-sm text-black whitespace-nowrap dark:text-darkText-400 sm:ml-2">Note Name :</h3>
                            </div>
                            <input
                                placeholder="Untitled"
                                maxLength={80}
                                className="px-2 py-2 ml-1 resize-none border text-xs font-[500] rounded-md w-full outline-none bg-transparent dark:text-white dark:border-darkBorder-700 text-black border-gray-200 transition-colors duration-300"
                                type="text"
                                value={noteName}
                                onChange={(e) => setNoteName(e.target.value)}
                            />
                        </div>
                        <div className="flex md:flex-row flex-col min-h-10 md:gap-4 gap-2 mb-8 lg:mb-0">
                            {/* Icon & Label */}
                            <div className="sm:w-[40%] gap-4 p-[5px] flex items-center">
                                <div className="w-[5%]">
                                    <FiLink/>
                                </div>
                                <h3 className="text-sm text-black whitespace-nowrap dark:text-darkText-400 sm:ml-2">Questions Linked :</h3>
                            </div>

                            {/* Simple Input Field */}
                            <div className="w-full">
                                <input
                                    type="text"
                                    placeholder="Enter question link..."
                                    className="w-full border dark:border-darkBorder-700 rounded-md py-1.5 px-2 text-sm text-gray-700 dark:text-darkText-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <Editor
                            apiKey="06uys0mqhocineaoxtq8561s3od7hzci5bp9wjn4fzu2scdu"
                            value={noteContent}
                            onEditorChange={(content) => setNoteContent(content)}
                            init={{
                                height: "100%",
                                min_height: 300,
                                menubar: false,
                                plugins: "lists link image table code help wordcount",
                                toolbar: "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist | link image | code",
                                content_style: "body { font-family: Arial, sans-serif; font-size: 14px; }"
                            }}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
