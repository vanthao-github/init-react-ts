import { CloseOutlined, FilterFilled, SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input, Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/lib/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { DATE_FORMAT_BACKEND, DATE_FORMAT_FRONTEND, PAGE_SIZE } from '../../constants';

export type Props = TableProps<Record<string, unknown>> & {
  query?: any;
  columns?: ColumnsType<Record<string, unknown>>;
  modifying?: boolean;
  bulkUpdate?(rows: any[]): { title: string; actions: any } | undefined;
  onChange2?(params: any): void;
  dataSource?: any[];
};

function flatten(arr: any) {
  return arr.reduce(function (flat: any, toFlatten: any) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

type State = {
  selection: { [key: string]: any[] };
};

function getSortDirection(field: string | string[], query: any) {
  const fieldName = Array.isArray(field) ? field.join('_') : field;
  const direction = query[`sorts[${fieldName}]`] + 'end';
  if (direction === 'ascend' || direction === 'descend') {
    return direction;
  }
  return undefined;
}

function getFilteredValue(field: string | string[], query: any) {
  const fieldName = Array.isArray(field) ? field.join('_') : field;
  const fieldValue = query[`filters[${fieldName}]`];
  return fieldValue ? [fieldValue] : null;
}

function getColumnSearchProps(type?: any): any {
  return {
    filterDropdown: (filterDropdownProps: any) => {
      const { setSelectedKeys, selectedKeys, confirm, clearFilters } = filterDropdownProps;
      return (
        <div style={{ padding: 8 }}>
          {type === 'date' && (
            <DatePicker
              style={{ width: 188, marginBottom: 8, display: 'block' }}
              format={DATE_FORMAT_FRONTEND}
              value={selectedKeys[0] ? moment(selectedKeys[0], DATE_FORMAT_BACKEND) : null}
              onChange={(e) => setSelectedKeys(e ? [e.format(DATE_FORMAT_BACKEND)] : [])}
            />
          )}
          {type !== 'date' && (
            <Input
              placeholder="Search"
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={confirm}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
          )}
          <Button size="small" style={{ width: 90, marginRight: 8 }} onClick={clearFilters}>
            Reset
          </Button>
          <Button type="primary" icon={<SearchOutlined />} size="small" style={{ width: 90 }} onClick={confirm}>
            Search
          </Button>
        </div>
      );
    },
    filterIcon: (filtered: boolean) =>
      type === 'date' ? (
        <FilterFilled style={{ color: filtered ? '#050593' : undefined }} />
      ) : (
        <SearchOutlined style={{ color: filtered ? '#050593' : undefined }} />
      ),
  };
}

const BaseTable: React.FC<Props> = ({
  bulkUpdate,
  pagination,
  query = {},
  columns = [],
  onChange2,
  modifying,
  dataSource,
  ...props
}) => {
  const [state, setState] = useState<State>({ selection: {} });

  useEffect(() => {
    if (!modifying) {
      setState({ selection: {} });
    }
  }, [modifying]);
  function handleTableChange(pagination: any, filter: any, sorter: any) {
    const nextQuery: any = {
      page: pagination.current,
      per_page: pagination.pageSize,
    };
    if (sorter.order && sorter.field) {
      const sortField = `sorts[${Array.isArray(sorter.field) ? sorter.field.join('_') : sorter.field}]`;
      const sortValue = sorter.order.replace('end', '');
      nextQuery[sortField] = sortValue;
    }
    for (const field of Object.keys(filter)) {
      if (filter[field]) {
        const filterField = `filters[${field.replace('.', '_')}]`;
        let filterValue = filter[field];
        if (Array.isArray(filterValue)) {
          filterValue = filterValue.join(',').trim();
        } else {
          filterValue = typeof filterValue === 'string' ? filterValue.trim() : filterValue;
        }
        nextQuery[filterField] = filterValue;
      }
    }
    onChange2 && onChange2(nextQuery);
  }
  const COLUMNS = columns.map((colProps: any) => {
    const { searchable, ...rest } = colProps;
    return {
      ...rest,
      ...(rest.sorter ? { sortOrder: getSortDirection(rest.dataIndex, query) } : {}),
      ...(rest.filters || searchable ? { filteredValue: getFilteredValue(rest.dataIndex, query) } : {}),
      ...(searchable ? getColumnSearchProps(searchable) : {}),
    };
  });
  if (bulkUpdate) {
    COLUMNS.splice(0, 0, {
      key: '-',
      fixed: ('left' as unknown) as boolean,
      width: 1,
    });
  }
  const selectionPopover = bulkUpdate && bulkUpdate(flatten(Object.values(state.selection)));
  const rowSelection = bulkUpdate && {
    selectedRowKeys: flatten(Object.values(state.selection)).map((row: any) => row.id),
    onChange: (_: any, selectedRows: any) => {
      setState({
        selection: {
          ...state.selection,
          [(pagination as any).current]: selectedRows.filter((s: any) => s),
        },
      });
    },
    // columnWidth: 40
  };
  const paginationProps: any =
    pagination !== false
      ? {
          showSizeChanger: true,
          current: Number(query.page) || 1,
          pageSize: Number(query.per_page) || PAGE_SIZE,
          ...pagination,
        }
      : false;
  return (
    <div className="table-base-wrapper">
      {selectionPopover && (
        <div className="selection-popover">
          <span className="text-selected">
            {selectionPopover.title}
            {selectionPopover.title && (
              <Button
                size="small"
                type="link"
                icon={<CloseOutlined />}
                className="close"
                onClick={() => setState({ selection: {} })}
              />
            )}
          </span>
          {selectionPopover.actions}
        </div>
      )}
      <Table
        rowKey="id"
        rowSelection={rowSelection}
        showSorterTooltip={false}
        pagination={paginationProps}
        columns={COLUMNS}
        scroll={{ x: 2200 }}
        onChange={handleTableChange}
        dataSource={dataSource}
        {...props}
      />
    </div>
  );
};

export default BaseTable;
