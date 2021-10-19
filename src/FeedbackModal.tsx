import * as React from "react";

type Props = {
  onClose: () => void;
};
export default function FeedbackModal(props: Props) {
  const [feedback, setFeedback] = React.useState("");

  function handleSubmitFeedback() {
    if (!feedback) {
      return;
    }

    alert("Send");
  }

  return (
    <div
      style={{
        width: 300,
        minHeight: 150,
        backgroundColor: "white",
        borderRadius: 7,
        boxShadow: "rgb(0 0 0 / 27%) 5px 5px 15px 0px",
        display: "flex",
        zIndex: 9999,
        padding: 10,
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "helvetica, arial",
      }}
    >
      {/* Header */}
      <div
        style={{
          width: "100%",
          display: "flex",
          fontWeight: "bold",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ margin: 0, color: "black" }}>Give Feedback!</p>
        <button
          style={{
            width: 20,
            height: 20,
            background: "none",
            padding: 0,
            border: 0,
            cursor: "pointer",
          }}
          onClick={props.onClose}
        >
          <svg
            width="12px"
            height="12px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="Path"
              d="M19.773 16.809 L12.94 9.953 19.789 3.186 C20.07 2.905 20.07 2.447 19.789 2.166 L17.841 0.208 C17.706 0.073 17.523 0 17.331 0 17.138 0 16.956 0.078 16.82 0.208 L10.003 6.955 3.174 0.213 C3.039 0.078 2.857 0.005 2.664 0.005 2.471 0.005 2.289 0.083 2.154 0.213 L0.211 2.171 C-0.07 2.452 -0.07 2.91 0.211 3.191 L7.06 9.958 0.232 16.809 C0.096 16.944 0.018 17.126 0.018 17.319 0.018 17.512 0.091 17.694 0.232 17.829 L2.18 19.787 C2.32 19.927 2.503 20 2.69 20 2.872 20 3.06 19.932 3.201 19.787 L10.003 12.957 16.81 19.781 C16.951 19.922 17.133 19.995 17.32 19.995 17.503 19.995 17.69 19.927 17.831 19.781 L19.779 17.824 C19.914 17.689 19.992 17.507 19.992 17.314 19.987 17.126 19.909 16.944 19.773 16.809 Z"
              fill="#aeaeae"
              stroke="none"
            />
          </svg>
        </button>
      </div>

      <textarea
        placeholder="I really ..."
        style={{
          marginTop: 12,
          borderRadius: 7,
          fontSize: 14,
          resize: "none",
          height: 55,
          color: "black",
          backgroundColor: "white",
          borderColor: "rgba(51,51,51,0.2)",
          wordBreak: "break-word",
          padding: 10,
          fontFamily: "helvetica, arial",
        }}
        onChange={(e) => setFeedback(e.target.value)}
      ></textarea>
      {/* Footer */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button
          style={{
            cursor: "pointer",
            backgroundColor: !feedback
              ? "rgba(51,51,51,0.2)"
              : "rgb(13, 166, 125)",
            borderRadius: 7,
            marginTop: 16,
            padding: 6,
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "helvetica, arial",
            border: 0,
          }}
          onClick={handleSubmitFeedback}
        >
          Send Feedback
        </button>
      </div>
    </div>
  );
}
