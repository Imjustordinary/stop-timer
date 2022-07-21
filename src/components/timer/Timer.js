import React, { useCallback, useEffect, useState, memo, useMemo } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Timer() {
  const [timeH, setTimeH] = useState(0);
  const [timeM, setTimeM] = useState(0);
  const [timeS, setTimeS] = useState(0);
  const [timeMs, setTimeMs] = useState(0);

  const [myInterval, setMyInterval] = useState();

  const [stopTime, setStopTime] = useState(true);
  const [started, setStarted] = useState(false);

  const resetHandler = useCallback(() => {
    console.log("reset");
    setTimeH(0);
    setTimeM(0);
    setTimeMs(0);
    setTimeS(0);
    setStopTime(true);
    setStarted(false);
  }, []);

  const stopHandler = useCallback(() => {
    console.log("stop");
    setStopTime(true);
  }, []);

  const StartedButtons = memo(() => {
    return (
      <>
        <Button onClick={stopHandler} variant="btn btn-outline-danger mx-2">
          Stop
        </Button>
        <Button onClick={resetHandler} variant="btn btn-outline-warning mx-2">
          Reset
        </Button>
      </>
    );
  }, []);

  const OnStartHandler = useCallback(() => {
    setStopTime(false);
    setStarted(true);
  }, []);

  const InitialButton = memo(() => {
    return (
      <Button onClick={OnStartHandler} variant="btn btn-outline-primary mx-2">
        Start
      </Button>
    );
  }, []);

  const buttonSection = useMemo(() => {
    if (!!started) {
      return <StartedButtons />;
    } else {
      return <InitialButton />;
    }
  }, [started]);

  const startTiming = useCallback(() => {
    if (timeMs > 99) {
      setTimeS((prev) => prev + 1);
      setTimeMs(0);
    }
    if (timeS > 59) {
      setTimeM((prev) => prev + 1);
      setTimeS(0);
      setTimeMs(0);
    }
    if (timeM > 59) {
      setTimeH((prev) => prev + 1);
      setTimeS(0);
      setTimeMs(0);
      setTimeM(0);
    }
  }, [timeMs]);

  useEffect(() => {
    startTiming();
  }, [timeMs]);

  useEffect(() => {
    if (stopTime === false) {
      setMyInterval(setInterval(() => setTimeMs((prev) => prev + 1), 10));
    }
    if (stopTime === true) {
      clearInterval(myInterval);
    }
  }, [stopTime]);

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <div className="col-12 col-lg-7 border rounded p-2 py-3">
        <Row className="pb-4">
          <Col className="d-flex justify-content-center">
            <div className="col-2 border rounded d-inline-block text-center py-2">
              {timeH < 10 ? "0" + timeH : timeH}
            </div>
            <div className="col-1 d-inline-block rounded text-center py-2">
              :
            </div>
            <div className="col-2 border d-inline-block rounded text-center py-2">
              {timeM < 10 ? "0" + timeM : timeM}
            </div>
            <div className="col-1 d-inline-block rounded text-center py-2">
              :
            </div>
            <div className="col-2 border d-inline-block rounded text-center py-2">
              {timeS < 10 ? "0" + timeS : timeS}
            </div>
            <div className="col-1 d-inline-block rounded text-center py-2">
              :
            </div>
            <div className="col-2 border d-inline-block rounded text-center py-2">
              {timeMs < 10 ? "0" + timeMs : timeMs}
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">{buttonSection}</Col>
        </Row>
      </div>
    </Container>
  );
}

export default Timer;
