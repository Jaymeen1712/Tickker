"use client";

import { LuSearch } from "react-icons/lu";
import CustomButton from "../custom-button";
import { Input } from "../ui/input";
import useHeaderWithSearchSuggestionBoxController from "./comp-controller";
import SearchSuggestionBox from "./suggestion-box/comp";

const HeaderSearchWithSuggestionBox = () => {
  const {
    searchQuery,
    searchInputRef,
    isSearchSuggestionBoxVisible,
    setIsSearchSuggestionBoxVisible,
    products,
    isGetProductsLoading,
    handleSearchInputChange,
    handleSearchSuggestionBoxVisibility,
    isNoResultBannerVisible,
    handleSearchButtonClick,
  } = useHeaderWithSearchSuggestionBoxController();

  return (
    <div className="relative w-full">
      <div className="flex items-center">
        <Input
          placeholder="Search..."
          className={`focus-visible:ring-none h-[38px] w-full rounded-r-none border p-5 text-base outline-none ${isSearchSuggestionBoxVisible && "rounded-b-none"}`}
          value={searchQuery}
          ref={searchInputRef}
          onChange={handleSearchInputChange}
          onFocus={handleSearchSuggestionBoxVisibility}
        />
        <CustomButton
          className="m-0 h-[42px] rounded-l-none p-5"
          onClick={handleSearchButtonClick}
        >
          <LuSearch color="white" className="text-lg" />
        </CustomButton>
      </div>
      <div className="absolute z-50 w-full">
        <SearchSuggestionBox
          searchInputRef={searchInputRef}
          isSearchSuggestionBoxVisible={isSearchSuggestionBoxVisible}
          setIsSearchSuggestionBoxVisible={setIsSearchSuggestionBoxVisible}
          products={products}
          isGetProductsLoading={isGetProductsLoading}
          isNoResultBannerVisible={isNoResultBannerVisible}
        />
      </div>
    </div>
  );
};

export default HeaderSearchWithSuggestionBox;
