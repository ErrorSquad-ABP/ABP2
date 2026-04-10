import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { ScrollTopButton } from "../HomePage.styles";

export function HomeScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showScrollTop) {
    return null;
  }

  return (
    <ScrollTopButton type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <ChevronUp size={22} />
    </ScrollTopButton>
  );
}
