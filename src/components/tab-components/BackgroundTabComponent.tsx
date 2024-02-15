import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { ActivitiesCard } from "../cards/activities-card/ActivitiesCard";
import { Editor } from "primereact/editor";
import { useState } from "react";

export const BackgroundTabComponent = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("Background ...");

  return (
    <div className="w-full bg-gray-100 border-none p-4">
      <Editor
        value={text}
        onTextChange={(e) => setText(e.htmlValue)}
        style={{ height: "320px" }}
        readOnly
      />
    </div>
  );
};
