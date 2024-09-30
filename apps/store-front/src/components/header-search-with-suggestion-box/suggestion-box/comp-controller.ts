import { useEffect, useRef } from "react";

interface SearchSuggestionBoxControllerProps {
  searchInputRef: React.RefObject<HTMLInputElement>;
  setIsSearchSuggestionBoxVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const useSearchSuggestionBoxController = ({
  searchInputRef,
  setIsSearchSuggestionBoxVisible,
}: SearchSuggestionBoxControllerProps) => {
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        searchInputRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setIsSearchSuggestionBoxVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchContainerRef, searchInputRef, setIsSearchSuggestionBoxVisible]);

  return {
    searchContainerRef,
  };
};

export default useSearchSuggestionBoxController;
