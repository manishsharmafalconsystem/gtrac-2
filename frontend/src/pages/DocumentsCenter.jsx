import React, { useState } from "react";
import { Clipboard, Download, FileText, Tag } from "lucide-react";
import jsPDF from "jspdf";

/* ---------------- Sample Document Data ---------------- */
const documents = [
  {
    id: 1,
    title: "Account Setup Guide",
    description: "Step-by-step guide on how to set up your account.",
    content: "This is the full content of Account Setup Guide...",
    tags: ["Account", "Usage"],
  },
  {
    id: 2,
    title: "FAQs",
    description: "Frequently asked questions by users.",
    content: "This is the full content of FAQs document...",
    tags: ["FAQs"],
  },
  {
    id: 3,
    title: "Account Usage Tips",
    description: "Tips and tricks to get the most out of your account.",
    content: "This is the full content of Account Usage Tips...",
    tags: ["Account", "Usage"],
  },
  {
    id: 4,
    title: "How to Work with Dashboard",
    description: "A detailed guide to understand the dashboard.",
    content: "This is the full content of How to Work with Dashboard...",
    tags: ["Usage"],
  },
];

/* ---------------- Document Center Component ---------------- */
const DocumentsCenter = () => {
  const [selectedTag, setSelectedTag] = useState("All");

  // Filter documents by tag
  const filteredDocuments =
    selectedTag === "All"
      ? documents
      : documents.filter((doc) => doc.tags.includes(selectedTag));

  // Copy content to clipboard
  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    alert("Document content copied to clipboard!");
  };

  // Download document as PDF
  const handleDownload = (title, content) => {
    const doc = new jsPDF();
    doc.text(content, 10, 10);
    doc.save(`${title}.pdf`);
  };

  // Unique tags for filter
  const tags = ["All", ...new Set(documents.flatMap((doc) => doc.tags))];

  return (
    <div className="min-h-screen p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6">Help & Supports</h1>

      {/* Tag Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
              selectedTag === tag
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((doc) => (
          <div
            key={doc.id}
            className="bg-white p-4 rounded-xl shadow-md flex flex-col gap-3 hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-lg">{doc.title}</h2>
            </div>

            <p className="text-gray-600 text-sm">{doc.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {doc.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-gray-200 text-gray-700 rounded-full"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleCopy(doc.content)}
                className="flex items-center gap-1 px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm transition"
              >
                <Clipboard className="w-4 h-4" /> Copy
              </button>
              <button
                onClick={() => handleDownload(doc.title, doc.content)}
                className="flex items-center gap-1 px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
              >
                <Download className="w-4 h-4" /> PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentsCenter;
