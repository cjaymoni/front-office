import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { BriefsDocumentForm } from "../../pages/briefs/briefs-documents/BriefsDocumentsForm";
import { DocumentExplorerIndex } from "../document-explorer/DocumentExplorerIndex";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";

export const AttachmentsTabComponent = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [folder_name, setFolder_name] = useState("");
  const [document_url, setDocument_url] = useState(null);
  const [description, setDescription] = useState("");
  return (
    <div className="w-full bg-gray-100 border-none p-4">
      <div className="flex justify-end mb-4">
        <Button
          icon="pi pi-plus"
          label="New"
          outlined
          onClick={() => setVisible(true)}
        />
      </div>
      <DocumentExplorerIndex />
      <Dialog
        visible={visible}
        modal={false}
        style={{ width: "60vw" }}
        onHide={() => setVisible(false)}
        header="Add Document"
      >
        <form id="staffRoom" className="w-full">
          <div className="w-full p-4 grid grid-cols-2 gap-6">
            {/*  title */}
            <div className="flex flex-col mb-4">
              <label
                htmlFor="title"
                className="font-medium text-left mb-3 text-gray-500 required-field"
              >
                Title
              </label>
              <div className="flex flex-col">
                <InputText
                  type="text"
                  name="title"
                  placeholder="Enter document title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-1 ml-3 text-gray-500 outline-none"
                />
              </div>
            </div>
            {/* folder_name */}
            <div className="flex flex-col mb-4">
              <label
                htmlFor="folder_name"
                className="font-medium text-left mb-3 text-gray-500 required-field"
              >
                Folder Name
              </label>
              <div className="flex flex-col">
                <InputText
                  type="folder_name"
                  name="folder_name"
                  placeholder="Enter  folder name"
                  value={folder_name}
                  onChange={(e) => setFolder_name(e.target.value)}
                  className="w-full p-1 ml-3 text-gray-500 outline-none"
                />
              </div>
            </div>

            {/* document_url */}
            <div className="flex flex-col mb-4">
              <label
                htmlFor="document_url"
                className="font-medium text-left mb-3 text-gray-500 required-field"
              >
                Choose Document
              </label>
              <div className="flex flex-col">
                <InputText
                  type="file"
                  name="document_url"
                  placeholder="Enter  document_url"
                  value={document_url}
                  onChange={(e) => setDocument_url(e.target.files)}
                  className="w-full p-1 ml-3 text-gray-500 outline-none"
                />
              </div>
            </div>

            {/* description */}
            <div className="flex flex-col mb-4">
              <label
                htmlFor="document_url"
                className="font-medium text-left mb-3 text-gray-500 required-field"
              >
                Description
              </label>
              <Editor
                placeholder={"Enter Description .."}
                value={description}
                onTextChange={(e) => setDescription(e.textValue)}
                style={{ height: "320px" }}
                modules={{
                  toolbar: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ size: [] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [
                      { list: "ordered" },
                      { list: "bullet" },
                      { indent: "-1" },
                      { indent: "+1" },
                    ],
                    ["link", "image", "video"],
                    ["clean"],
                  ],
                  clipboard: {
                    // toggle to add extra line breaks when pasting HTML:
                    matchVisual: false,
                  },
                }}
              />
            </div>
          </div>
        </form>
        <div className="flex justify-end space-x-2">
          <Button label="Save" className="h-12 w-24" />
          <Button label="Close" severity="danger" className="h-12 w-24" />
        </div>
      </Dialog>
    </div>
  );
};
