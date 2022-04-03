import { React, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { IoSearch, IoClose } from 'react-icons/io5';
import { AnimatePresence, motion } from 'framer-motion';
import { useClickOutside } from 'react-click-outside-hook';
import MoonLoader from 'react-spinners/MoonLoader';

const SearchBarContainer = styled(motion.div)`
  position: absolute;
  top: 17px;
  left: 30px;
  display: flex;
  flex-direction: column;
  width: 34em;
  height: 2.5em;
  background-color: white;
  border-radius: 6px;
  // box-shadow: 2px 4px 10px 1px rgba(201,201,201,0.47);
  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
  overflow: hidden;
  z-index: 11;
`;

const SearchInputContainer = styled.div`
  width: 100%;
  min-height: 3em;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px 15px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  font-size: 12px;
  color: #12112e;
  font-weight: 400;
  letter-spacing: 1px;
  border-radius: 6px;
  background-color: transparent;
  padding-bottom: 5px;

  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }

  &::placeholder {
    color: #bebebe;
    transition: all 0.4s ease-in-out;
  }
`;

const SearchIcon = styled.span`
  color: #bebebe;
  font-size: 16px;
  margin-right: 10px;
  vertical-align: middle;
`;

const CloseIcon = styled(motion.span)`
  color: #bebebe;
  font-size: 12px;
  margin-right: 30px;
  vertical-align: middle;
  transition: all 0.4s ease-in-out;

  &:hover {
    color: #dfdfdf;
  }
`;

const LineSeparator = styled.span`
  display: flex;
  min-width: 100%;
  min-height: 1px;
  background-color: #d8d8d878;
`;

const SearchContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
`;

const LoadingWrapper = styled.div`
  width:100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

`;

const containerVariants = {
  expanded: {
    height: '20em',
  },
  collapsed: {
    height: '2.8em',
  },
};

const containerTransition = { type: 'spring', damping: 22, stiffness: 150 };

const Search = (props) => {
  const [isExpanded, setExpanded] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside(false);
  const inputRef = useRef();

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    if (inputRef.current) inputRef.current.value = '';
  };

  useEffect(() => {
    if (isClickedOutside) {
      collapseContainer();
    }
  }, [isClickedOutside]);
  return (
    <>
      <SearchBarContainer
        animate={isExpanded ? 'expanded' : 'collapsed'}
        variants={containerVariants}
        transition={containerTransition}
        ref={parentRef}
      >
        <SearchInputContainer>
          <SearchIcon>
            <IoSearch />
          </SearchIcon>
          <SearchInput
            placeholder='What are you looking for?'
            onFocus={expandContainer}
            ref={inputRef}
          />
          <AnimatePresence>
            {isExpanded && (
            <CloseIcon
              key='close-icon'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={collapseContainer}
              transition={{ duration: 0.2 }}
            >
              <IoClose />
            </CloseIcon>
            )}
          </AnimatePresence>
        </SearchInputContainer>
        <LineSeparator />
        <SearchContent>
          <LoadingWrapper>
            <MoonLoader loading color='#7451f8' size={25} />
          </LoadingWrapper>
        </SearchContent>
      </SearchBarContainer>
    </>
  );
};

export default Search;
