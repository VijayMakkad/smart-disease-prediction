"use client";

import { useState } from "react";
import HealthForm from "../components/HealthForm";
import ChatBot from "../components/ChatBot";

export default function Home() {
  const [activeTab, setActiveTab] = useState("predict");

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Smart Disease Prediction System
            </h1>
            <p className="mt-2 text-slate-600">
              AI-powered health risk assessment and mental wellness support
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-xl bg-white shadow-sm p-1">
            <button
              onClick={() => setActiveTab("predict")}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === "predict"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🏥 Disease Risk Prediction
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === "chat"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              💬 Mental Health Support
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex justify-center">
          {activeTab === "predict" ? (
            <div className="w-full max-w-2xl">
              <HealthForm />
            </div>
          ) : (
            <div className="w-full max-w-3xl">
              <ChatBot />
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              About This System
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-600">
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">
                  🏥 Disease Risk Prediction
                </h3>
                <p>
                  Uses machine learning models to predict risk levels for chronic diseases
                  like diabetes, heart disease, and hypertension. Get explainable AI insights
                  with SHAP values and personalized preventive advice.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">
                  💬 Mental Health Support
                </h3>
                <p>
                  An AI chatbot trained to provide empathetic responses and mental health
                  support. Uses sentiment analysis to understand your emotional state and
                  offer appropriate guidance.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-xs text-slate-500 text-center">
                ⚠️ Disclaimer: This is an AI-assisted tool for educational and informational
                purposes only. Always consult with healthcare professionals for medical advice.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-sm text-slate-500">
            Smart Disease Prediction System • Built with Flask & Next.js
          </p>
        </div>
      </footer>
    </div>
  );
}
