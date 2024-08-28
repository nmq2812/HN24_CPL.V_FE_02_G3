import React, { useEffect, useState } from "react";
import FormUpdateProfile from "@/components/Form/FormUpdateProfile";

const SettingsPage: React.FC = () => {

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <FormUpdateProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
