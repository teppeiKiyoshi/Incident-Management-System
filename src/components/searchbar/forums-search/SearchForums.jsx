import { React, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { IoSearch, IoClose } from 'react-icons/io5';
import { AnimatePresence, motion } from 'framer-motion';
import { useClickOutside } from 'react-click-outside-hook';
import MoonLoader from 'react-spinners/MoonLoader';
import axios from 'axios';
import useDebounce from './debounce/Debounce';
import ItemView from './itemView/ItemView';  

const SearchBarContainer = styled(motion.div)`
  position: absolute;
  top: 23%;
  left: 19%;
  display: flex;
  flex-direction: column;
  width: 27em;
  height: 2em;
  background-color: white;
  border-radius: 6px;
  // box-shadow: 2px 4px 10px 1px rgba(201,201,201,0.47);
  //box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
  box-shadow: rgb(153 153 153/ 20%) -4px 4px 16px 0px;
  z-index: 1;
`;

const SearchInputContainer = styled.div`
  width: 100%;
  min-height: 2.7em;
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
  cursor: pointer;
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
  width: 399px;
  display: flex;
  flex-direction: column;
  padding: 1em;
  overflow-y: auto;
  overflow-x: hidden;
  cursor: pointer;
  background-color: white;
  z-index: 1;
`;

const WarningMessage = styled.span`
  color: #a1a1a1;
  font-size: 12px;
  display: flex;
  align-self: center;
  justify-self: center;
`

const LoadingWrapper = styled.div`
  width: 100%;
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
// main function starts here
const SearchForums = (props) => {
  const [isExpanded, setExpanded] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside(false);
  const inputRef = useRef();
  const [searchQuery, setSearchQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tvShow, setTvShow] = useState([]);
  const [noShow, setNoShow] = useState(false);

  const isEmpty = !tvShow || tvShow.length === 0;

  const handlechange = (e) => {
    e.preventDefault();
    if(e.target.value.trim() === 0) {
      setNoShow(false);
    }
    setSearchQuery(e.target.value);
  };

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    setSearchQuery('');
    setIsLoading(false);
    setNoShow(false);
    setTvShow([]);
    if (inputRef.current) inputRef.current.value = '';
  };

  useEffect(() => {
    if (isClickedOutside) {
      collapseContainer();
    }
  }, [isClickedOutside]);

  const prepareSearchQuery = (query) => {
    const url = `http://api.tvmaze.com/search/shows?q=${query}`;
    return encodeURI(url);
  };

  const searchShow = async () => {
    if (!searchQuery || searchQuery.trim() === '') return;

    setIsLoading(true);
    setNoShow(false);

    const URL = prepareSearchQuery(searchQuery);
    const response = await axios.get(URL).catch((err) => {
      console.log('Error', err);
    });

    if (response) {
      console.log('Response ', response.data);
      if(response.data && response.data.length === 0) 
        setNoShow(true);

      setTvShow(response.data);
    }

    setIsLoading(false);
  };

  useDebounce(searchQuery, 500, searchShow);
  return (
    <>
      <SearchBarContainer
        animate={isExpanded ? 'expanded' : 'collapsed'}
        variants={containerVariants}
        transition={containerTransition}
        ref={parentRef}
        className='search-bar-container'
      >
        <SearchInputContainer>
          <SearchIcon>
            <IoSearch />
          </SearchIcon>
          <SearchInput
            placeholder='What are you looking for?'
            onFocus={expandContainer}
            ref={inputRef}
            value={searchQuery}
            onChange={handlechange}
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
        {isExpanded && <LineSeparator />}
        {isExpanded && (<SearchContent className='search-bar-content'> 
          {isLoading && (
            <LoadingWrapper>
              <MoonLoader loading color='#893dff' size={25} />
            </LoadingWrapper>
          )}
          {!isLoading && isEmpty && !noShow && (<LoadingWrapper><WarningMessage>Start typing your queries...</WarningMessage></LoadingWrapper>)}
          {!isLoading && noShow && (<LoadingWrapper><WarningMessage>No student matches your search...</WarningMessage></LoadingWrapper>)}
          {!isLoading && !isEmpty && <>
            {tvShow.map(({show})=> (
              <ItemView key={show.id} thumbnailSrc={show.image && show.image.medium} name={show.name} />
            ))
            }
          </>}
        </SearchContent>)}
      </SearchBarContainer>
    </>
  );
};

export default SearchForums;
