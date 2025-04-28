'use client'

import {useCallback, useEffect, useState} from 'react';
import {usePartnersStore} from "@/store/partners.store";
import {Input, Select} from "antd";
import {usePartners} from "@/hooks/usePartners";
import PartnersService from "@/services/partners.service";
import {debounce} from "@/functions/debounce";

const PartnersSearch = () => {

  const {categories, isLoading} = usePartners();

  const {updateFilteredPartners, updateLoading} = usePartnersStore();

  const [searchInput, setSearchInput] = useState('');
  const [searchSelect, setSearchSelect] = useState([]);

  const [payload, setPayload] = useState({})

  const handleSearchCategory = (value) => {
    setSearchSelect(value)
  }

  const handleFilterPartners = async (payload) => {

    updateLoading(true)
    try {
      const response = await PartnersService.fetchPartners(payload);

      if (response.status === 200) {
        updateFilteredPartners(response.data);
      }

      updateLoading(false)

    } catch (e) {
      updateLoading(false);
      updateFilteredPartners([]);
    }
  }

  useEffect(() => {
    setPayload({
      label: searchInput,
      categories: searchSelect,
    })
  }, [searchInput, searchSelect]);

  const debouncedSearchPartners = useCallback(debounce(handleFilterPartners, 500), []);

  useEffect(() => {
    if (payload?.label || (Array.isArray(payload?.categories) && !!payload.categories.length)) {
      debouncedSearchPartners(payload);
    } else {
      updateFilteredPartners([]);
    }
  }, [payload, debouncedSearchPartners]);



  return (
    <div className="partners-search">
      <div className="container">
        <div className="partners-search__body">
          <Input
            allowClear={true}
            placeholder="Поиск по названию"
            className="partners-search__input"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
          {!isLoading && !!categories?.length && (
            <Select
              mode="multiple"
              optionFilterProp="value"
              maxTagCount="responsive"
              className="partners-search__select"
              allowClear
              placeholder="Категории"
              onChange={handleSearchCategory}
              options={categories}
              value={searchSelect}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnersSearch;
