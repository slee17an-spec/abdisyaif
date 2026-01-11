import React, { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import Spinner from "../Spinner.js"; // spinner custom Tailwind

function ProxyDataFetcher({ city, query, topic, user }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const payloads = [
    { target: "weather", params: { city } },
    { target: "nasa", params: {} },
    { target: "unsplash", params: { query } },
    { target: "pexels", params: { query } },
    { target: "youtube", params: { query } },
    { target: "news", params: { topic } },
    { target: "github", params: { user } }
  ];

  useEffect(() => {
    async function fetchAll() {
      try {
        const responses = await Promise.all(
          payloads.map(async (payload) => {
            const res = await fetch("http://127.0.0.1:5000/api/proxy", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload)
            });
            const data = await res.json();
            return { target: payload.target, data };
          })
        );
        setResults(responses);
      } catch (err) {
        console.error("Error fetching proxy data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, [city, query, topic, user]);

  if (loading) return <Spinner message="Fetching API data..." />;

  return (
    <div className="grid gap-6 p-6 sm:grid-cols-2 md:grid-cols-3">
      {results.map((result) => (
        <Disclosure key={result.target}>
          {({ open }) => (
            <div className="bg-white shadow-md rounded-lg border border-gray-200">
              <Disclosure.Button className="w-full px-4 py-2 text-left text-blue-600 font-bold">
                {result.target.toUpperCase()}
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 py-2 text-sm text-gray-700">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(result.data).slice(0, 5).map(([key, value]) => (
                      <tr key={key} className="border-b border-gray-100">
                        <td className="font-semibold py-1 pr-2">{key}</td>
                        <td className="py-1">
                          {typeof value === "object"
                            ? JSON.stringify(value)
                            : String(value)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      ))}
    </div>
  );
}

export default ProxyDataFetcher;
