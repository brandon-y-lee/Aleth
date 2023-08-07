import React, { useEffect, useState } from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { TooltipComponent } from 'echarts/components';
import { TreeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { useGetOrderSellerDetailsQuery, useGetTechPackQuery, useGetQueriesForTechPackQuery } from "state/api";

echarts.use([TooltipComponent, TreeChart, CanvasRenderer]);

const SupplierTree = ({ techPackId, onTreeClick }) => {
  const {data: techPack, isLoading: isLoadingTechPack} = useGetTechPackQuery({techPackId});
  const {data: queries, isLoading: isLoadingQueries} = useGetQueriesForTechPackQuery({techPackId});
  console.log('Tech Pack: ', techPack);
  console.log('Queries: ', queries);

  const [option, setOption] = useState({
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
    },
    series: [
      {
        type: 'tree',
        top: '1%',
        left: '7%',
        bottom: '1%',
        right: '20%',
        symbolSize: 7,
        label: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right',
          fontSize: 9,
        },
        leaves: {
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left',
          },
        },
        emphasis: {
          focus: 'descendant',
        },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750,
      },
    ],
  });

  const handleTreeNodeClick = (params) => {
    console.log('Params Data: ', params.data)
    if (params.data && params.data.orderId) {
      onTreeClick(params.data.orderId);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (isLoadingTechPack || isLoadingQueries) return;
      
      const children = await Promise.all(techPack.techPack.orderQueries.map(async (queryId) => {
        const query = queries.techPackQueries.find(q => q.id === queryId);
        console.log('Query: ', query);
        const sellers = []; //await fetchEligibleSellers(queryId);

        const sellerNodes = sellers.map(seller => ({ name: seller.name }));

        return {
          name: query.material,
          children: sellerNodes,
          orderId: queryId,
        };
      }));

      console.log('Children: ', children);

      const treeData = {
        name: techPack.techPack.productCategory,
        children,
      };

      setOption(prevOption => ({
        ...prevOption,
        series: [{
          ...prevOption.series[0],
          data: [treeData],
        }],
      }));
    }

    fetchData();
}, [techPackId, isLoadingTechPack, queries, isLoadingQueries]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {option && (
        <ReactEChartsCore
          echarts={echarts}
          option={option}
          onEvents={{ click: handleTreeNodeClick }}
          style={{ height: '100%', width: '100%' }}
        />
      )}
    </div>
  );
};

export default SupplierTree;
