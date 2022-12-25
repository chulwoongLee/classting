import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Fragment, useEffect, useState } from "react";
import { Button, CircularProgress, Modal } from "@mui/material";
import CustomText from "src/components/common/CustomText";
declare global {
  interface Window {
    customLoadingOpen: Function;
    customLoadingClose: Function;
  }
}
export default function App({ Component, pageProps }: AppProps) {
  const [alertMessage, setAlertMessage] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);
  useEffect(() => {
    window.alert = (a) => {
      setAlertMessage(a);
    };
    window.customLoadingOpen = () => {
      setLoadingStatus(true);
    };
    window.customLoadingClose = () => {
      setLoadingStatus(false);
    };
  }, []);
  return (
    <Fragment>
      <Component {...pageProps} />
      <Modal open={alertMessage.length > 0}>
        <div
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: 24,
              borderRadius: 24,
              maxWidth: 340,
            }}
          >
            <CustomText text={alertMessage} bold type="H4" pointApply />
            <Button
              style={{ marginTop: 12 }}
              variant="contained"
              fullWidth
              onClick={() => {
                setAlertMessage("");
              }}
            >
              <CustomText text="확인" bold type="P2" />
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={loadingStatus}
        hideBackdrop
      >
        <CircularProgress />
      </Modal>
    </Fragment>
  );
}
