import React, { useEffect, useState } from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { TooltipComponent } from 'echarts/components';
import { TreeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { useGetEligibleSellersAdvancedQuery, useGetTechPackQuery, useGetQueriesForTechPackQuery } from "state/api";
echarts.use([TooltipComponent, TreeChart, CanvasRenderer]);

const SearchTree = ({ techPackId }) => {
  const {data: techPack, isLoading: isLoadingTechPack} = useGetTechPackQuery({techPackId});
  const {data: queries, isLoading: isLoadingQueries} = useGetQueriesForTechPackQuery({techPackId});

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

  useEffect(() => {
    if (isLoadingTechPack || isLoadingQueries) return;

    const actualQueries = techPack.techPack.orderQueries.map(queryId =>
      queries.techPackQueries.find(query => query.id === queryId)
    );

    Promise.all(
      actualQueries.map((query) =>
        useGetEligibleSellersAdvancedQuery({
          products: query.productCategory,
          material: query.materialType,
          fabricConstruction: query.fabricConstruction,
          certifications: ""  // Adjust this as needed
        }).then(sellers => ({ query, sellers }))
      )
    ).then(allEligibleSellers => {
      const children = allEligibleSellers.map(({ query, sellers }) => {
        const sellerNodes = sellers.map(seller => ({ name: seller.name }));
        return {
          name: query.material,
          children: sellerNodes,
        };
      });

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
    });
  }, [techPackId, isLoadingTechPack, queries, isLoadingQueries]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {option && (
        <ReactEChartsCore
          echarts={echarts}
          option={option}
          style={{ height: '100%', width: '100%' }}
        />
      )}
    </div>
  );
};

export default SearchTree;
