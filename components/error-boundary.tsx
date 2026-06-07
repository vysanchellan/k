"use client";
import React from "react";

interface Props { children: React.ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", minHeight: "100vh", padding: 20,
          backgroundColor: "var(--bg)", color: "var(--text)",
          fontFamily: "'Fira Code', monospace", textAlign: "center",
        }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", color: "var(--primary)", marginBottom: 16 }}>
            something broke
          </h1>
          <p style={{ color: "var(--text-muted)", marginBottom: 24, fontSize: "0.85rem" }}>
            but she&apos;d debug it in seconds.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: "var(--primary)", color: "var(--bg)",
              border: "none", padding: "0.75rem 2rem", borderRadius: 8,
              fontFamily: "'Fira Code', monospace", fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
