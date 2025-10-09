import React, { useState, useEffect } from "react";
import "../Styles/TypeWriter.css";
import { useGameState } from "./GameState";

const getColorFilter = (color) => {
  const colorMap = {
    "var(--orange)":
      "invert(73%) sepia(53%) saturate(464%) hue-rotate(359deg) brightness(92%) contrast(89%)",
    "var(--white)":
      "invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",
  };
  return colorMap[color] || colorMap["var(--white)"];
};

// Parse spans like <span style='color:var(--red)'>TEXT</span>
const parseTextWithSpans = (text) => {
  const regex = /<span style=['"]color:([^'"]+)['"]>(.*?)<\/span>/g;
  let match;
  let lastIndex = 0;
  const segments = [];

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index), color: null });
    }
    segments.push({ text: match[2], color: match[1] });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), color: null });
  }

  return segments;
};

const TypewriterText = ({
  text,
  onComplete,
  speed = 50,
  delayAfterComplete = 1000,
  textColor,
  triangleColor,
  triangleSize,
  triangleMargin,
  textSize,
  name,
  nameColor,
  showTriangle = true,
}) => {
  const [typedSegments, setTypedSegments] = useState([]);
  const [canAdvance, setCanAdvance] = useState(false);
  const { dispatch } = useGameState();

  useEffect(() => {
    const parsed = parseTextWithSpans(text);
    setTypedSegments([]);
    setCanAdvance(false);

    if (name && name !== "אני")
      dispatch({ type: "SET_TALKING", value: true });

    let segIndex = 0;
    let charIndex = 0;
    const output = parsed.map((s) => ({ ...s, shown: "" }));

    let isCancelled = false; // 🚫 Prevent async glitching

    const typeNext = () => {
      if (isCancelled) return;

      if (segIndex >= parsed.length) {
        if (name && name !== "אני")
          dispatch({ type: "SET_TALKING", value: false });

        // ✅ Only show triangle when text actually finishes
        setCanAdvance(true);
        return;
      }

      const current = parsed[segIndex];

      if (charIndex < current.text.length) {
        output[segIndex].shown += current.text[charIndex];
        setTypedSegments([...output]);
        charIndex++;
        setTimeout(typeNext, speed);
      } else {
        segIndex++;
        charIndex = 0;
        setTimeout(typeNext, speed);
      }
    };

    typeNext();

    return () => {
      isCancelled = true;
      if (name && name !== "אני")
        dispatch({ type: "SET_TALKING", value: false });
    };
  }, [text, speed, name]);

  const handleClick = () => {
    if (canAdvance && onComplete) onComplete();
  };

  return (
    <div className="typewriter-container" onClick={handleClick}>
      <div
        className={`typewriter-text ${
          canAdvance && showTriangle ? "clickable" : ""
        }`}
        style={{ color: textColor, fontSize: textSize }}
      >
        <p>
          {name && <span style={{ color: nameColor }}>{name}:</span>}{" "}
          {typedSegments.map((part, i) => (
            <span key={i} style={part.color ? { color: part.color } : {}}>
              {part.shown}
            </span>
          ))}
          {canAdvance && showTriangle && (
            <img
              src="./General/triangle-indicator.svg"
              alt="Continue"
              className="continue-triangle"
              style={{
                filter: `brightness(0) saturate(100%) ${getColorFilter(
                  triangleColor
                )}`,
                width: triangleSize,
                margin: triangleMargin,
              }}
            />
          )}
        </p>
      </div>
    </div>
  );
};

export default TypewriterText;
