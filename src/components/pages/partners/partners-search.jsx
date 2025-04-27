import {useEffect, useState} from 'react';
import {usePartnersStore} from "@/store/partners.store";
import {Input, Select} from "antd";
import {usePartners} from "@/hooks/usePartners";

const PartnersSearch = () => {

  const {categories, isLoading} = usePartners();

  // console.log(categories);

  const {updateFilteredPartners, updateLoading} = usePartnersStore();

  const [searchInput, setSearchInput] = useState('');
  const [searchSelect, setSearchSelect] = useState([]);

  const handleSearchCategory = (value) => {
    setSearchSelect(value)
  }

  useEffect(() => {
    console.log(searchInput)
    console.log(searchSelect)
  }, [searchInput, searchSelect]);



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
