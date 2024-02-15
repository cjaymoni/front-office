import { BreadCrumb } from "primereact/breadcrumb";
import { useRef, useState } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";

const home = {
  icon: "pi pi-home",
  url: "https://www.primereact.org",
  label: "Home",
};

export const DocumentExplorerIndex = () => {
  const [redirect, setRedirect] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const handleFolderClick = (folderName: string) => {
    setRedirect(true);
    setSelectedFolder(folderName);
  };

  const RootDoc = () => {
    return (
      <div>
        <BreadCrumb home={home} className="mb-5 border-none" />
        <div className="flex flex-row flex-wrap gap-10">
          <FolderView
            folderName="Discovery"
            onFolderClick={() => handleFolderClick("Discovery")}
          />
          <FolderView
            folderName="Expert Reports"
            onFolderClick={() => handleFolderClick("Expert Reports")}
          />
          <FolderView
            folderName="Case Law"
            onFolderClick={() => handleFolderClick("Case Law")}
          />
          <FolderView
            folderName="Photos of Scene"
            onFolderClick={() => handleFolderClick("Photos of Scene")}
          />
          <FileView fileName="test" fileType="ppt" />
          <FileView fileName="test" fileType="pdf" />
          <FileView fileName="test" fileType="xls" />
          <FileView fileName="test" fileType="txt" />
          <FileView fileName="test" fileType="audio" />
          <FileView fileName="test" fileType="video" />
          <FileView fileName="test" fileType="doc" />
          <FileView fileName="test" fileType="zip" />
          <FileView fileName="test" fileType="img" />
        </div>
      </div>
    );
  };

  return (
    <div>
      {redirect ? (
        <OpenedFolderView folder={{ name: selectedFolder }} />
      ) : (
        <RootDoc />
      )}
    </div>
  );
};

const FolderView = (props: {
  folderName: string;
  onFolderClick?: (folderName: string) => void;
}) => {
  const [showSub, setShowSub] = useState(false);

  const handleClick = () => {
    if (props.onFolderClick) {
      props.onFolderClick(props.folderName);
    }
    setShowSub(!showSub);
    console.log(props.folderName);
  };
  return (
    <div className="flex flex-col cursor-pointer" onClick={() => handleClick()}>
      <i
        className="pi pi-folder text-gray-500"
        style={{ fontSize: "5rem" }}
      ></i>
      <span>{props.folderName}</span>
    </div>
  );
};

const FileView = (props: { fileName: string; fileType: string }) => {
  const op = useRef(null);
  return (
    <div>
      <div
        className="flex flex-col cursor-pointer"
        onClick={(e) => op.current.toggle(e)}
      >
        {props.fileType === "pdf" ? (
          <i
            className="pi pi-file-pdf text-gray-500"
            style={{ fontSize: "5rem" }}
          ></i>
        ) : props.fileType === "xls" ? (
          <i
            className="pi pi-file-excel text-gray-500"
            style={{ fontSize: "5rem" }}
          ></i>
        ) : props.fileType === "doc" ? (
          <i
            className="pi pi-file-word text-gray-500"
            style={{ fontSize: "5rem" }}
          ></i>
        ) : props.fileType === "ppt" ? (
          <i
            className="fa fa-file-powerpoint text-gray-500"
            style={{ fontSize: "5rem" }}
          ></i>
        ) : props.fileType === "txt" ? (
          <i
            className="fa fa-file-lines text-gray-500"
            style={{ fontSize: "5rem" }}
          ></i>
        ) : props.fileType === "zip" ? (
          <i
            className="fa fa-file-zipper text-gray-500"
            style={{ fontSize: "5rem" }}
          ></i>
        ) : props.fileType === "img" ? (
          <i
            className="pi pi-image text-gray-500"
            style={{ fontSize: "5rem" }}
          ></i>
        ) : props.fileType === "audio" ? (
          <i
            className="fa fa-headphones text-gray-500"
            style={{ fontSize: "5rem" }}
          ></i>
        ) : props.fileType === "video" ? (
          <i
            className="pi pi-video text-gray-500"
            style={{ fontSize: "5rem" }}
          ></i>
        ) : (
          <i
            className="pi pi-file text-gray-500"
            style={{ fontSize: "5rem" }}
          ></i>
        )}

        <span>{props.fileName}</span>
      </div>
      <OverlayPanel ref={op}>
        <div className="flex">
          <Button
            icon="pi pi-download"
            rounded
            outlined
            className="mr-2"
            tooltip="Download"
            tooltipOptions={{ position: "bottom" }}
          />
          <Button
            icon="pi pi-trash"
            rounded
            outlined
            severity="danger"
            tooltip="Delete"
            tooltipOptions={{ position: "bottom" }}
          />
        </div>
      </OverlayPanel>
    </div>
  );
};

const OpenedFolderView = (props: { folder: any }) => {
  const iconItemTemplate = (item, options) => {
    console.log(options);
    return (
      <a className="text-black cursor-pointer">
        <span className={item.icon}></span>
        <span className="ml-2">{item.label}</span>
      </a>
    );
  };

  const items = [
    {
      icon: "pi pi-sitemap",

      label: props.folder?.name,
      template: iconItemTemplate,
    },
  ];

  return (
    <div>
      <BreadCrumb home={home} model={items} className="mb-5 border-none" />
      <div className="flex flex-row flex-wrap gap-10">
        <FolderView folderName="Sub Discovery Folder" />
        <FileView fileName="test" fileType="ppt" />
        <FileView fileName="test" fileType="pdf" />
        <FileView fileName="test" fileType="xls" />
        <FileView fileName="test" fileType="txt" />
        <FileView fileName="test" fileType="audio" />
        <FileView fileName="test" fileType="video" />
        <FileView fileName="test" fileType="doc" />
        <FileView fileName="test" fileType="zip" />
        <FileView fileName="test" fileType="img" />
      </div>
    </div>
  );
};
