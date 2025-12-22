// src/components/HealthForm.jsx
"use client";

import { useState } from "react";
import { predictDisease } from "../lib/api";

const initialForm = {
  disease: "diabetes",
  age: "",
  bmi: "",
  glucose: "",
};

export default function HealthForm() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const payload = {
        disease: form.disease,
        age: Number(form.age),
        bmi: Number(form.bmi),
        glucose: Number(form.glucose),
      };

      const data = await predictDisease(payload);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-slate-800 mb-2">
        Smart Disease Risk Prediction
      </h2>
      <p className="text-sm text-slate-500">
        Enter basic health parameters to estimate chronic disease risk and get
        explainable AI feedback.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        {/* Disease selector */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Disease Type
          </label>
          <select
            name="disease"
            value={form.disease}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="diabetes">Diabetes</option>
            <option value="heart">Heart Disease</option>
            <option value="hypertension">Hypertension</option>
          </select>
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Age (years)
          </label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 45"
            min="0"
          />
        </div>

        {/* BMI */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            BMI
          </label>
          <input
            type="number"
            step="0.1"
            name="bmi"
            value={form.bmi}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 26.5"
            min="0"
          />
        </div>

        {/* Glucose */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Fasting Glucose (mg/dL)
          </label>
          <input
            type="number"
            name="glucose"
            value={form.glucose}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 140"
            min="0"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Predicting..." : "Predict Risk"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Error */}
      {error && (
        <div className="mt-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-4 border-t border-slate-100 pt-4 space-y-3">
          <h3 className="text-lg font-semibold text-slate-800">
            Prediction Result
          </h3>

          <div className="text-sm">
            <p>
              <span className="font-medium">Disease:</span>{" "}
              {result.disease?.toUpperCase()}
            </p>
            <p>
              <span className="font-medium">Risk Score:</span>{" "}
              {result.risk_score?.toFixed(2)}
            </p>
            <p>
              <span className="font-medium">Risk Level:</span>{" "}
              <span
                className={
                  result.risk_label === "High"
                    ? "text-red-600 font-semibold"
                    : result.risk_label === "Moderate"
                    ? "text-yellow-600 font-semibold"
                    : "text-green-600 font-semibold"
                }
              >
                {result.risk_label}
              </span>
            </p>
          </div>

          {/* SHAP explanation */}
          {Array.isArray(result.explanation) && result.explanation.length > 0 && (
            <div className="text-sm">
              <p className="font-medium mb-1">Top contributing factors:</p>
              <ul className="list-disc list-inside space-y-0.5">
                {result.explanation.map((item, idx) => (
                  <li key={idx}>
                    <span className="font-medium capitalize">
                      {item.feature}:
                    </span>{" "}
                    value {item.value}{" "}
                    <span className="text-slate-500">
                      (SHAP: {item.shap_value.toFixed(3)})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* GenAI advice */}
          {result.advice && (
            <div className="text-sm bg-blue-50 border border-blue-100 rounded-xl px-3 py-2 mt-2">
              <p className="font-medium mb-1">Preventive Advice (AI-generated):</p>
              <p className="whitespace-pre-line">{result.advice}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
