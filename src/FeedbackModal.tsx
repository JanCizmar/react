import * as React from "react";
import {ReactNode} from "react";

import {sendFeedback} from "@feedbackfarm/core";
import "./styles.scss";
import {getStrings, Strings} from "./getStrings";

export type IdentifierMode = "required" | "optional";

export type Colors = {
  feature?: { text: string; background: string };
  bug?: { text: string; background: string };
  other?: { text: string; background: string };
  send?: { text: string; background: string };
  background?: string;
  disabledColor?: string;
  borderColor?: string;
};

type Props = {
  projectId: string;
  identifier?: string;
  onClose: () => void;
  onFeedbackAdded?: () => void;
  colors?: Colors;
  identifierMode?: IdentifierMode;
  identifierPlaceholder?: string;
  strings?: Strings
};

type FeedbackType = "BUG" | "FEATURE" | "OTHER";

function formatColor(colors?: Colors) {
  const defaultColor = {
    feature: {text: "#FFFFFF", background: "#2ADE9E"},
    bug: {text: "#FFFFFF", background: "#FF4D2B"},
    other: {text: "#FFFFFF", background: "#16DBF5"},
    send: {text: "#FFFFFF", background: "rgb(46, 212, 167)"},
    background: "#FFFFFF",
    disabledColor: "#C6C6C6",
    textColor: "black",
    borderColor: "transparent",
  };

  return {...defaultColor, ...colors};
}

export default function FeedbackModal(props: Props) {
  const strings = getStrings(props.strings)
  const [feedback, setFeedback] = React.useState("");
  const [state, setState] = React.useState<"ask" | "conclusion">("ask");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("" as ReactNode);
  const [feedbackType, setFeedbackType] = React.useState<FeedbackType>();

  const [identifier, setIdentifier] = React.useState(props.identifier);

  const widgetColor = formatColor(props.colors);

  async function handleSubmitFeedback() {
    try {
      if (state === "conclusion") {
        setFeedback("");
        setState("ask");

        setFeedbackType(undefined);
        return;
      }

      if (!feedback || isLoading || !feedbackType) {
        return;
      }

      if (props.identifierMode === "required" && !identifier) {
        return;
      }

      setIsLoading(true);
      const result = await sendFeedback(
        props.projectId,
        feedback,
        feedbackType,
        identifier,
        window.location.pathname
      );
      if (result.status !== 200) {
        setError(strings.error);
        console.error(result.statusText);
      }

      if (props.onFeedbackAdded) {
        props.onFeedbackAdded();
      }

      setState("conclusion");
    } catch (error) {
      setError(strings.error);
    }
    setIsLoading(false);
  }

  function handleKeyDown(event: any) {
    if (event.key === "Enter" && event.metaKey) {
      handleSubmitFeedback();
    }
  }

  function handleSetFeedbackType(type: FeedbackType) {
    setFeedbackType(type);
    document.getElementById("FF210xFF_textAreaFeedback")?.focus();
  }

  const sendButtonBackgroundColor = (() => {
    if (props.identifierMode === "required" && !identifier) {
      return widgetColor.disabledColor;
    }

    return !feedback || !feedbackType
      ? widgetColor.disabledColor
      : widgetColor.send.background;
  })();

  return (
    <>
      <div
        className="FF210xFF_reset FF210xFF_container"
        style={{
          backgroundColor: widgetColor.background,
          border: `1px solid ${widgetColor.borderColor}`,
        }}
      >
        {/* Header */}
        <div className="FF210xFF_reset FF210xFF_header">
          <div className="FF210xFF_reset FF210xFF_top">
            <p
              className="FF210xFF_reset FF210xFF_title"
              style={{color: widgetColor.textColor}}
            >
              {state === 'ask' ? strings.askTitle : strings.conclusionTitle}
            </p>
            <button
              className="FF210xFF_reset FF210xFF_closeButton"
              onClick={props.onClose}
            >
              <svg
                width="12px"
                height="12px"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.773 16.809 L12.94 9.953 19.789 3.186 C20.07 2.905 20.07 2.447 19.789 2.166 L17.841 0.208 C17.706 0.073 17.523 0 17.331 0 17.138 0 16.956 0.078 16.82 0.208 L10.003 6.955 3.174 0.213 C3.039 0.078 2.857 0.005 2.664 0.005 2.471 0.005 2.289 0.083 2.154 0.213 L0.211 2.171 C-0.07 2.452 -0.07 2.91 0.211 3.191 L7.06 9.958 0.232 16.809 C0.096 16.944 0.018 17.126 0.018 17.319 0.018 17.512 0.091 17.694 0.232 17.829 L2.18 19.787 C2.32 19.927 2.503 20 2.69 20 2.872 20 3.06 19.932 3.201 19.787 L10.003 12.957 16.81 19.781 C16.951 19.922 17.133 19.995 17.32 19.995 17.503 19.995 17.69 19.927 17.831 19.781 L19.779 17.824 C19.914 17.689 19.992 17.507 19.992 17.314 19.987 17.126 19.909 16.944 19.773 16.809 Z"
                  fill="#aeaeae"
                  stroke="none"
                />
              </svg>
            </button>
          </div>
          {state === "ask" && (
            <>
              <p
                className="FF210xFF_reset FF210xFF_subtitle"
                style={{color: widgetColor.textColor}}
              >
                {strings.askSubtitle}
              </p>
              <div className="FF210xFF_reset FF210xFF_buttons">
                <button
                  className="FF210xFF_reset FF210xFF_classificationButton"
                  style={{
                    backgroundColor:
                      feedbackType === "FEATURE"
                        ? widgetColor.feature.background
                        : widgetColor.disabledColor,
                  }}
                  onClick={() => handleSetFeedbackType("FEATURE")}
                >
                  <span style={{color: widgetColor.feature.text}}>
                    {strings.feedbackTypes.feature}
                  </span>
                </button>

                <button
                  className="FF210xFF_reset FF210xFF_classificationButton"
                  style={{
                    backgroundColor:
                      feedbackType === "BUG"
                        ? widgetColor.bug.background
                        : widgetColor.disabledColor,
                  }}
                  onClick={() => handleSetFeedbackType("BUG")}
                >
                  <span style={{color: widgetColor.bug.text}}>
                    {strings.feedbackTypes.bug}
                  </span>
                </button>
                <button
                  className="FF210xFF_reset FF210xFF_classificationButton"
                  style={{
                    backgroundColor:
                      feedbackType === "OTHER"
                        ? widgetColor.other.background
                        : widgetColor.disabledColor,
                  }}
                  onClick={() => handleSetFeedbackType("OTHER")}
                >
                  <span style={{color: widgetColor.other.text}}>
                    {strings.feedbackTypes.other}
                  </span>
                </button>
              </div>
            </>
          )}
        </div>

        {state === "ask" && (
          <textarea
            id="FF210xFF_textAreaFeedback"
            placeholder={
              feedbackType ? strings.textareaPlaceholders[feedbackType] : strings.textareaPlaceholders.DEFAULT
            }
            className="FF210xFF_reset FF210xFF_textArea"
            onKeyDown={handleKeyDown}
            onChange={(e) => setFeedback(e.target.value)}
            style={{
              backgroundColor: widgetColor.background,
              borderColor: widgetColor.disabledColor,
              color: widgetColor.textColor,
            }}
          />
        )}

        {state === "ask" && !!props.identifierMode && (
          <input
            style={{
              marginTop: 8,
              backgroundColor: widgetColor.background,
              border: `1px solid ${widgetColor.disabledColor}`,
              color: widgetColor.textColor,
              borderRadius: 7,
              boxShadow: "none",
              padding: 10,
              outline: "none",
            }}
            value={identifier}
            placeholder={
              props.identifierPlaceholder ||
              strings.userIdentificationInputPlaceholder
            }
            onChange={(e) => setIdentifier(e.target.value)}
          />
        )}

        {state === "conclusion" && (
          <p
            className="FF210xFF_reset FF210xFF_conclusion"
            style={{color: widgetColor.textColor}}
          >
            {strings.conclusionSubtitle}
          </p>
        )}
        {/* Footer */}
        <div className="FF210xFF_reset FF210xFF_footer">
          {error && (
            <div className="FF210xFF_reset FF210xFF_error">
              <span>{error}</span>
            </div>
          )}
          <div className="FF210xFF_reset FF210xFF_innerFooter">
            <button
              className="FF210xFF_reset FF210xFF_actionButton"
              style={{
                backgroundColor: sendButtonBackgroundColor,
                ...(isLoading
                  ? {animation: "shrinkButton 0.4s ease-in-out forwards"}
                  : {animation: "unshrinkButton 0.1s ease-in-out forwards"}),
              }}
              onClick={handleSubmitFeedback}
            >
              <span
                className="FF210xFF_reset FF210xFF_feedbackButtonText"
                style={{color: widgetColor.send.text}}
              >
                {!isLoading ? (state === 'ask' ? strings.sendButton : strings.anotherFeedbackButton) : ""}
                {isLoading && (
                  <div className="FF210xFF_reset FF210xFF_loadingContainer">
                    <div className="FF210xFF_reset FF210xFF_loading"/>
                  </div>
                )}
              </span>
            </button>
          </div>
          <span className="FF210xFF_reset FF210xFF_poweredBy">
            Powered by{" "}
            <a
              href="https://feedback.farm"
              target="_blank"
              className="FF210xFF_link"
            >
              feedback.farm
            </a>
          </span>
        </div>
      </div>
    </>
  );
}
