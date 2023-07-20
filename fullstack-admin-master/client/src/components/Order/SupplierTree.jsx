import React, { useEffect, useState } from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { TooltipComponent } from 'echarts/components';
import { TreeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { useGetOrderSellerDetailsQuery } from "state/api";
// import API call for fetching tech pack data and fetching orderIDs of queries

echarts.use([TooltipComponent, TreeChart, CanvasRenderer]);

// Placeholder fetch functions, replace with your own
async function fetchTechPack() {
  // Fetch tech pack data here...
}

async function fetchOrderQuery(queryId) {
  // Fetch query data here...
}

async function fetchEligibleSellers(queryId) {
  // Fetch sellers data here...
}

const SupplierTree = ({ techPackId }) => {
//   let {data: sellerDetails, isLoading: isLoadingSellerDetails} = useGetOrderSellerDetailsQuery({orderId});
//   console.log('Seller Details: ', sellerDetails);

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
    async function fetchData() {
      const techPack = await fetchTechPack(techPackId);

      const children = await Promise.all(techPack.orderQueries.map(async (queryId) => {
        const query = await fetchOrderQuery(queryId);
        const sellers = await fetchEligibleSellers(queryId);

        const sellerNodes = sellers.map(seller => ({ name: seller.name }));

        return {
          name: query.material,
          children: sellerNodes,
        };
      }));

      const treeData = {
        name: techPack.material,
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
  }, [techPackId]);

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

export default SupplierTree;
