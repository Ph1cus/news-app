import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Помилка в Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>😵 Щось пішло не так.</h2>
          <p>Спробуйте оновити сторінку або повернутись пізніше.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
