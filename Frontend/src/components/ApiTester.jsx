
import React, { useState } from "react";
import api from "./api.js";
import './ApiTester.css'

function ApiTester() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("/");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
    setLoading(true);
    setResponse(null);
    setStatus(null);

    try {
      let res;

      // ---------------- GET ----------------
      if (method === "GET") {
        res = await api.get(url);
      }

      // ---------------- POST ----------------
      else if (method === "POST") {
        let data = {};

        if (body.trim()) {
          data = JSON.parse(body);
        }

        res = await api.post(url, data);
      }

      // ---------------- PUT ----------------
      else if (method === "PUT") {
        let data = {};

        if (body.trim()) {
          data = JSON.parse(body);
        }

        res = await api.put(url, data);
      }

      // ---------------- PATCH ----------------
      else if (method === "PATCH") {
        let data = {};

        if (body.trim()) {
          data = JSON.parse(body);
        }

        res = await api.patch(url, data);
      }

      // ---------------- DELETE ----------------
      else if (method === "DELETE") {
        res = await api.delete(url);
      }

      setStatus(res.status);
      setResponse(res.data);
    } catch (err) {
      console.error(err);

      setStatus(err.response?.status || "ERROR");

      setResponse(
        err.response?.data || {
          error: err.message,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="api-tester">

      <div className="header">
        <h1>API Tester</h1>
        <p>Test your Express API</p>
      </div>

      {/* REQUEST BAR */}
      <div className="request-bar">

        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className={`method ${method.toLowerCase()}`}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="/user"
          className="url-input"
        />

        <button
          onClick={sendRequest}
          disabled={loading}
          className="send-btn"
        >
          {loading ? "Sending..." : "Send"}
        </button>

      </div>

      {/* REQUEST BODY */}
      {(method === "POST" ||
        method === "PUT" ||
        method === "PATCH") && (

        <div className="section">

          <div className="section-title">
            <h3>Request Body</h3>
            <span>JSON</span>
          </div>

          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={`{
  "name": "Rohan",
  "age": 22
}`}
            className="body-editor"
          />

        </div>
      )}

      {/* RESPONSE */}
      <div className="section">

        <div className="section-title">
          <h3>Response</h3>

          {status && (
            <span
              className={
                typeof status === "number" &&
                status >= 200 &&
                status < 300
                  ? "status success"
                  : "status error"
              }
            >
              {status}
            </span>
          )}
        </div>

        <pre className="response">
          {response !== null
            ? JSON.stringify(response, null, 2)
            : "Send a request to see the response..."}
        </pre>

      </div>

    </div>
  );
}

export default ApiTester;
