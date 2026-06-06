import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          padding: "60px 24px",
          textAlign: "center",
          color: "#fff",
          fontFamily: "Inter, sans-serif",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <h2 style={{ color: "#ef4444", fontSize: "2rem", marginBottom: "12px" }}>
            Something went wrong
          </h2>
          <p style={{ color: "#94a3b8", marginTop: "12px", marginBottom: "24px", maxWidth: "500px" }}>
            {this.state.error.message}
          </p>
          <button
            onClick={() => window.location.href = "/"}
            style={{
              padding: "10px 24px",
              background: "#22c55e",
              color: "#000",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "14px",
              transition: "opacity 0.2s ease"
            }}
            onMouseEnter={(e) => e.target.style.opacity = "0.9"}
            onMouseLeave={(e) => e.target.style.opacity = "1"}
          >
            Return to Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
