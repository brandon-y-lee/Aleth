import React, { useEffect, useState, useCallback } from 'react';
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
  const [selectedQuery, setSelectedQuery] = useState(null);

  const {data: sellers} = useGetEligibleSellersAdvancedQuery({
    products: [selectedQuery?.productCategory],
    material: selectedQuery?.materialType,
    fabricConstruction: selectedQuery?.fabricConstruction,
    certifications: ""  // Adjust this as needed
  });

  console.log(sellers);

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

  const onChartClick = useCallback((params) => {
    // console.log(params);
    // console.log(queries.techPackQueries.find(query => query.id === "1"));
    if (params.dataType === 'main') {
      const query = queries.techPackQueries.find(query => query.id === params.data.id);
      console.log(query);
      setSelectedQuery(query);
    }
  }, [queries]);

  // useEffect(() => {
  //   if (isLoadingTechPack || isLoadingQueries) return;

  //   const actualQueries = techPack.techPack.orderQueries.map(queryId =>
  //     queries.techPackQueries.find(query => query.id === queryId)
  //   );

  //   const sellers = [];
  //   const treeData = {
  //     name: techPack.techPack.productCategory,
  //     children: actualQueries.map((query) => ({
  //       name: query.material,
  //       "id": query.id
  //       // children: sellers.map(seller => ({ name: seller.name, id:  })),
  //     })),
  //   };

  //   setOption({
  //     tooltip: {
  //       trigger: 'item',
  //       triggerOn: 'mousemove',
  //     },
  //     series: [
  //       {
  //         type: 'tree',
  //         top: '1%',
  //         left: '7%',
  //         bottom: '1%',
  //         right: '20%',
  //         symbolSize: 7,
  //         label: {
  //           position: 'left',
  //           verticalAlign: 'middle',
  //           align: 'right',
  //           fontSize: 9,
  //         },
  //         leaves: {
  //           label: {
  //             position: 'right',
  //             verticalAlign: 'middle',
  //             align: 'left',
  //           },
  //         },
  //         emphasis: {
  //           focus: 'descendant',
  //         },
  //         expandAndCollapse: true,
  //         animationDuration: 550,
  //         animationDurationUpdate: 750,
  //         data: [treeData],
  //       },
  //     ],
  //     animationEasing: 'cubicOut',
  //   });
  // }, [techPackId, isLoadingTechPack, queries, isLoadingQueries, sellers]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {option && (
        <ReactEChartsCore
          echarts={echarts}
          option={option}
          style={{ height: '100%', width: '100%' }}
          onEvents={{'click': onChartClick}}
        />
      )}
    </div>
  );
};

export default SearchTree;