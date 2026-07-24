'use client'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import { useProductsTypes} from "@/hooks/useProducts";
import {Button, Checkbox} from "antd";
import {useCallback} from "react";

const ProductsFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (updates) => {
      const params = new URLSearchParams(searchParams.toString());

      // Обновляем параметры
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined) {
          params.delete(key); // Удаляем параметр, если значение null/undefined
        } else {
          params.set(key, value);
        }
      });

      return params.toString();
    },
    [searchParams]
  );

  // Загрузка типов продуктов
  const { isLoading, types } = useProductsTypes();

  // Обработка изменения фильтра
  const onChange = (type) => {
    const currentType = searchParams.get('type');

    // Если текущий тип уже выбран, удаляем его (снимаем выбор)
    const newType = currentType === type ? null : type;

    // Обновляем URL
    router.push(`${pathname}?${createQueryString({ type: newType })}`);
  };

  // Сброс всех фильтров
  const resetFilter = () => {
    router.push(pathname); // Очищаем все параметры
  };

  // Логика для проверки активного состояния чекбоксов
  const isActive = (type) => {
    return searchParams.get('type') === type;
  };

  return (
    <div className="products-filter">
      {isLoading && 'Загружаем фильтры...'}

      {types && (
        <div className="products-filter__body">
          <div className="products-filter__category">
            <h4>Категории</h4>
            <div className="products-filter__category_values">
              {!!types?.length &&
                types.map((type) => (
                  <Checkbox
                    key={type}
                    checked={isActive(type)} // Проверяем, выбран ли этот тип
                    onChange={() => onChange(type)}
                  >
                    {type}
                  </Checkbox>
                ))}
            </div>
          </div>

          {/* Кнопка сброса */}
          <Button onClick={resetFilter} className="products-filter__reset style-btn style-btn-default">
            Сбросить
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductsFilter;
