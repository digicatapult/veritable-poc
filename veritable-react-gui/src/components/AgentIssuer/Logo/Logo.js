/**
 * This function renders the logo of the issuer page.
 * @returns A wrapper div with a svg image
 */
export default function Logo() {
  return (
    <>
      {/* <i className="fa d-inline fa-lg fa-stop-circle-o" /> */}
      <div className="float-left ml-1 mr-0" style={{ width: 35 }}>
        <svg
          viewBox="0 0 3000 3000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2878.86 1118.93C2824.93 932.3 2709.12 769.563 2550.45 657.461C2509.65 628.403 2466.33 603.066 2421 581.772C2413.43 577.97 2407.39 571.721 2403.83 564.047C2381.32 519.439 2355.25 476.723 2325.88 436.294C2210.83 280.073 2046.28 167.408 1859.01 116.64C1790.35 98.9813 1719.68 90.3716 1648.79 91.0357C1527.1 92.1386 1407 118.687 1296.18 168.977C1250.02 190.291 1205.77 215.519 1163.91 244.386C1157.96 248.219 1151.02 250.274 1143.93 250.293C1121.99 248.604 1100.03 248.045 1079.49 248.045C1050.52 248.243 1021.59 250.025 992.816 253.392C896.409 263.952 802.491 290.78 715.056 332.74C628.767 373.98 550.153 429.649 482.608 497.353C311.498 674.068 224.933 915.997 245.092 1161.14C245.628 1169.48 243.457 1177.76 238.9 1184.77C211.288 1226.55 187.102 1270.5 166.575 1316.18C1.86551 1681.59 121.104 2112.48 450.242 2341.26C491.107 2370.44 534.527 2395.87 579.975 2417.24C587.401 2421.08 593.414 2427.19 597.139 2434.68C619.302 2479.42 645.286 2522.16 674.809 2562.43C732.142 2640.53 802.379 2708.29 882.496 2762.78C961.475 2817 1049.13 2857.34 1141.68 2882.08C1210.52 2899.84 1281.37 2908.54 1352.46 2907.97C1473.99 2906.82 1593.93 2880.17 1704.51 2829.75C1750.67 2808.54 1794.92 2783.41 1836.77 2754.62C1842.78 2750.92 1849.7 2748.97 1856.76 2748.99C1876.74 2748.99 1898.12 2750.96 1922.32 2750.96C2355.86 2751.12 2717.5 2419.71 2755.03 1987.84C2759.12 1937.93 2759.12 1887.77 2755.03 1837.87C2754.28 1829.42 2756.47 1820.97 2761.22 1813.95C2788.9 1772.36 2813 1728.49 2833.26 1682.82C2882.33 1571.49 2907.45 1451.08 2906.99 1329.41C2907.05 1258.3 2897.59 1187.52 2878.86 1118.93ZM1435.2 250.577C1504.5 229.154 1576.55 217.973 1649.07 217.375C1709.24 216.758 1769.22 224.044 1827.49 239.042C1956.45 273.7 2073.33 343.326 2165.19 440.232C2174.25 449.805 2176.79 463.825 2171.66 475.966C2166.42 487.997 2154.67 495.9 2141.55 496.226C2139.88 496.541 2138.16 496.541 2136.49 496.226C2105.23 491.648 2073.77 488.642 2042.21 487.224C2022.79 487.224 2001.68 485.535 1977.21 487.224C1908.5 487.962 1839.98 494.366 1772.34 506.363H1767.83C1760.29 506.157 1753.01 503.602 1747.01 499.042C1677.21 441.595 1601 392.401 1519.9 352.441C1491.76 338.429 1462.93 325.842 1433.51 314.735C1420.3 309.911 1411.83 296.979 1412.69 282.939C1411.9 268.267 1421.17 254.938 1435.2 250.577ZM999.57 592.177C1048.73 516.041 1109.5 448.065 1179.68 390.707C1185.72 385.783 1193.27 383.099 1201.07 383.111H1206.13C1295.67 396.575 1382.61 423.715 1463.91 463.588C1487.27 474.843 1511.74 488.347 1539.32 504.67C1550.37 511.501 1556.41 524.146 1554.8 537.028C1553.69 550.283 1544.51 561.48 1531.73 565.165C1499.09 575.294 1468.13 585.427 1437.74 595.555L1425.35 599.777C1360.07 620.881 1312.79 635.79 1265.23 649.298C1217.67 662.809 1171.24 673.217 1121.15 684.472L1103.14 688.693C1067.11 696.573 1031.09 704.737 993.387 714.019C990.87 714.411 988.307 714.411 985.786 714.019C974.227 714.03 963.526 707.933 957.642 697.98C952.033 687.921 952.033 675.679 957.642 665.621C969.457 641.138 984.092 616.096 999.57 592.177ZM508.5 1790.03C494.249 1878.28 489.907 1967.84 495.554 2057.06C497.523 2085.2 501.182 2117.56 506.247 2150.48C508.383 2160.44 505.785 2170.83 499.213 2178.62C492.8 2185.74 483.746 2189.91 474.164 2190.16C465.798 2190.35 457.7 2187.22 451.652 2181.44C248.203 1999 169.616 1714.81 250.44 1453.78C255.742 1436.22 274.273 1426.29 291.829 1431.59C301.368 1434.47 309.106 1441.48 312.916 1450.68C324.456 1478.82 337.681 1508.93 351.753 1536.79C392.738 1616.36 442.482 1691.11 500.06 1759.64C507.21 1768.03 510.302 1779.15 508.5 1790.03ZM599.399 1438.3C588.423 1473.19 577.45 1508.64 566.194 1545.79C562.295 1559.84 549.543 1569.61 534.958 1569.71C523.485 1569.95 512.753 1564.05 506.818 1554.23C491.359 1530.23 477.175 1505.43 464.322 1479.94C422.094 1396.41 393.593 1306.63 379.897 1214.04C369.134 1151.04 366.299 1086.96 371.457 1023.26C371.457 1010.32 373.989 998.497 375.959 986.4C414.493 696.2 629.412 460.547 914.87 395.492C917.484 395.185 920.129 395.185 922.747 395.492C934.865 395.674 945.807 402.786 950.891 413.784C956.752 425.198 955.315 438.993 947.232 448.958C928.658 472.594 910.364 498.199 890.948 525.214C840.423 603.583 799.333 687.637 768.532 775.645C767.243 779.556 764.237 782.667 760.372 784.088C680.938 813.554 604.822 851.28 533.269 896.637C520.606 904.8 508.508 913.239 496.125 921.683C489.219 926.091 485.487 934.099 486.559 942.219C486.559 950.946 485.152 959.665 484.306 968.391C483.463 977.11 482.336 994.556 481.773 1007.5C481.21 1020.44 481.773 1035.64 481.773 1047.46V1058.43C481.734 1066.2 487.999 1072.53 495.768 1072.57C498.72 1072.59 501.602 1071.68 504.006 1069.97C520.89 1058.15 538.058 1046.61 555.505 1034.79L565.635 1027.76C571.543 1023.26 577.454 1019.03 583.645 1015.09L593.495 1008.62C612.349 995.958 633.455 983.297 656.814 970.353C671.08 963.269 688.334 966.737 698.747 978.792C704.899 986.784 707.265 997.057 705.222 1006.93C697.341 1039.57 690.87 1071.09 684.395 1101.48L683.832 1114.98C673.419 1167.88 661.599 1224.16 647.531 1278.18C633.459 1332.21 619.387 1377.79 603.35 1429.01L599.399 1438.3ZM724.627 2340.41L690.858 2328.03L686.636 2325.51L683.824 2320.72C648.902 2233.86 627.913 2142.03 621.632 2048.62C619.492 2020.54 618.831 1992.36 619.663 1964.21C619.973 1946.3 634.667 1931.97 652.592 1932.13C660.803 1932.02 668.754 1935.04 674.821 1940.57C702.965 1967.02 731.105 1992.07 759.246 2015.98L765.72 2021.89C803.994 2055.94 844.234 2092.52 882.228 2129.38C920.218 2166.24 956.519 2206.2 997.325 2250.66C1008.02 2262.2 1018.99 2273.73 1029.69 2285.55L1032.78 2288.92C1033.83 2289.53 1035.12 2289.53 1036.16 2288.92C1079.62 2288.04 1122.96 2284.19 1165.9 2277.39C1173.59 2276.27 1178.91 2269.13 1177.8 2261.44C1177.35 2258.42 1175.94 2255.62 1173.77 2253.47C1145.63 2225.33 1119.74 2197.2 1089.35 2163.99L1076.12 2148.79C1042.92 2112.78 1006.9 2074.23 970.032 2037.93C933.168 2001.63 897.71 1969.56 861.685 1937.2L841.701 1919.18C798.646 1880.64 757.276 1844.62 716.194 1804.1C697.341 1786.65 678.763 1768.09 659.91 1749.51C651.073 1740.1 647.488 1726.93 650.343 1714.34C656.251 1689.01 662.442 1663.97 669.197 1639.77C683.832 1585.18 699.869 1534.25 713.662 1490.64L722.665 1460.81C740.113 1409.32 755.591 1360.92 768.257 1309.43C780.919 1257.93 793.865 1200.81 806.527 1140.6L811.596 1115.83C820.882 1072.78 831.296 1023.82 843.958 973.172C849.302 950.946 855.777 925.9 863.658 899.169C867.449 886.555 877.252 876.644 889.829 872.717C911.778 865.68 932.321 860.053 951.178 854.429L963.277 851.05C1022.94 835.578 1078.94 822.913 1130.44 811.375L1151.26 806.594C1202.48 794.776 1250.6 783.525 1298.72 770.293C1346.84 757.07 1400.03 739.624 1448.72 724.144L1464.47 719.079C1515.41 702.197 1570 684.188 1627.98 667.023C1662.03 657.457 1689.61 650.14 1715.22 644.233C1778.57 629.009 1843.02 618.846 1907.98 613.843C1931.62 611.874 1955.26 610.752 1978.33 610.752C1997.19 610.752 2016.04 610.752 2034.62 610.752C2127.84 615.618 2219.69 635.281 2306.75 668.996C2310.58 670.262 2313.66 673.135 2315.19 676.872C2350.5 763.644 2371.68 855.501 2377.94 948.973C2379.63 975.425 2380.2 1003.28 2379.63 1033.39C2379.87 1051.57 2365.33 1066.5 2347.14 1066.74C2338.23 1066.86 2329.64 1063.35 2323.35 1057.02C2295.21 1030.57 2267.06 1005.53 2238.92 981.612L2224.86 968.951C2186.58 934.619 2150.28 901.701 2115.95 868.495C2081.61 835.294 2046.72 796.741 2010.7 758.195L2000.01 746.657L1976.93 721.332L1970.74 713.735C1968.46 711.603 1965.41 710.488 1962.3 710.636C1919.88 711.638 1877.57 715.491 1835.66 722.175C1827.84 723.48 1822.56 730.87 1823.86 738.688C1824.32 741.461 1825.59 744.036 1827.5 746.094C1851.98 771.703 1875.62 797.308 1902.08 825.162L1923.75 849.077C1958.08 885.937 1993.54 924.207 2030.68 961.626C2067.83 999.053 2112.86 1039.29 2153.94 1076.15L2173.36 1093.03L2188.56 1107.1C2219.8 1135.24 2252.16 1163.38 2285.09 1196.02C2303.94 1214.03 2325.33 1235.42 2347.84 1259.34C2350.97 1262.87 2352.32 1267.63 2351.5 1272.28C2345.02 1302.39 2337.71 1331.65 2329.83 1359.79C2314.35 1416.06 2298.31 1469.25 2282.83 1519.33L2279.18 1531.15C2262.29 1585.46 2246.25 1636.95 2232.18 1690.7C2218.11 1744.44 2207.41 1796.22 2194.18 1859.53L2187.43 1891.89C2178.15 1935.22 2168.3 1980.24 2156.76 2027.51C2150.57 2053.4 2142.68 2082.38 2133.12 2114.46C2131.57 2118.89 2128.02 2122.33 2123.55 2123.75C2092.32 2133.6 2063.05 2142.04 2039.13 2148.79C1979.47 2164.55 1923.18 2176.93 1872.53 2188.75L1864.37 2190.43C1811.74 2202.54 1757.15 2214.92 1703.4 2229.55C1649.65 2244.18 1595.62 2262.19 1542.43 2278.51L1540.74 2279.91L1514.29 2288.63C1469.55 2303.27 1423.39 2318.46 1373.58 2332.81H1370.2C1350.51 2338.72 1320.39 2347.16 1285.78 2355.04C1222.48 2370.05 1158.13 2380.21 1093.29 2385.43C1069.93 2387.4 1046.01 2388.53 1022.94 2388.53C999.862 2388.53 984.663 2388.53 966.657 2388.53L930.915 2386L899.396 2382.34L889.829 2380.93L863.374 2373.9C861.596 2374.07 859.805 2374.07 858.03 2373.9C849.586 2373.9 841.146 2370.8 833.265 2368.83C817.507 2366.02 801.745 2362.36 786.551 2358.42C768.261 2354.2 746.871 2348.01 724.359 2340.41H724.627V2340.41ZM1565.78 2748.14C1496.5 2769.67 1424.44 2780.95 1351.9 2781.63C1291.65 2782.16 1231.58 2774.88 1173.21 2759.96C1044.22 2725.21 927.349 2655.49 835.506 2558.49C826.429 2549.04 823.877 2535.08 829.031 2523.04C834.248 2511.02 846.044 2503.19 859.141 2503.05H864.489C895.162 2507.56 926.961 2510.93 958.201 2512.62C979.87 2512.62 1002.1 2514.31 1024.33 2514.03C1092.47 2513.14 1160.43 2506.64 1227.51 2494.61H1233.14C1240.45 2494.61 1247.56 2496.98 1253.4 2501.37C1323.45 2558.77 1399.72 2608.14 1480.79 2648.53C1508.93 2661.47 1537.07 2674.14 1567.18 2685.67C1580.37 2690.78 1588.93 2703.62 1588.57 2717.76C1588.13 2731.76 1578.87 2743.95 1565.5 2748.14H1565.78V2748.14ZM2001.12 2406.83C1952.13 2482.92 1891.44 2550.81 1821.3 2608.01C1815.55 2613.09 1808.14 2615.88 1800.48 2615.89H1795.13C1705.43 2602.9 1618.33 2575.84 1537.08 2535.7C1510.62 2522.76 1485.3 2507.56 1461.66 2494.62C1446 2484.76 1441.31 2464.09 1451.16 2448.44C1455.35 2441.77 1461.76 2436.81 1469.25 2434.4C1497.4 2425.68 1525.54 2416.96 1553.68 2407.67L1577.04 2400.35C1633.32 2382.06 1684.26 2365.18 1736.6 2350.27C1782.75 2337.6 1830.03 2326.63 1879.84 2315.66L1899.82 2310.88C1935.28 2303 1971.3 2294.84 2008.73 2285.83C2011.35 2285.56 2013.99 2285.56 2016.61 2285.83C2028.2 2285.7 2038.96 2291.83 2044.75 2301.87C2050.26 2311.85 2050.26 2323.97 2044.75 2333.95C2030.96 2358.43 2016.05 2383.48 2000.85 2406.83H2001.12V2406.83ZM2513.02 2071.13C2513.25 2068.88 2513.25 2066.62 2513.02 2064.37C2518.45 2023.34 2520.99 1981.96 2520.62 1940.57C2520.66 1932.8 2514.39 1926.46 2506.62 1926.42C2503.67 1926.41 2500.79 1927.32 2498.38 1929.03C2470.24 1947.88 2444.35 1965.89 2413.96 1985.31C2392.29 1999.94 2367.53 2015.13 2340.51 2030.05C2335.81 2032.78 2330.47 2034.23 2325.03 2034.27C2314.77 2034.49 2304.98 2029.92 2298.58 2021.89C2292.42 2013.89 2290.06 2003.62 2292.11 1993.75C2299.14 1965.61 2304.77 1937.47 2310.4 1909.33L2316.31 1883.45C2325.87 1834.49 2337.98 1776.52 2352.61 1719.68C2365.83 1669.31 2380.75 1618.38 2397.07 1569.14L2399.89 1560.14C2410.86 1525.25 2421.56 1489.51 2432.53 1452.09C2436.67 1438 2449.64 1428.36 2464.33 1428.45C2475.63 1428.62 2486.14 1434.29 2492.47 1443.65C2509.36 1471.79 2523.15 1495.14 2534.69 1518.21C2576.78 1601.79 2605.28 1691.56 2619.11 1784.12C2629.45 1847.16 2631.72 1911.28 2625.87 1974.9C2625.87 1987.56 2623.33 1999.94 2621.09 2012.04C2582.74 2302.23 2367.89 2537.94 2082.46 2602.94C2079.93 2603.24 2077.38 2603.24 2074.86 2602.94C2062.7 2602.64 2051.77 2595.43 2046.72 2584.38C2040.78 2572.97 2042.22 2559.13 2050.37 2549.2C2069.51 2525.28 2087.8 2499.68 2106.66 2472.94C2154.97 2397.45 2194.79 2316.87 2225.42 2232.64C2229.42 2222.3 2237.59 2214.13 2247.93 2210.13C2324.97 2180.99 2398.73 2143.83 2468 2099.26L2501.49 2077.04C2504.99 2075.4 2508.14 2073.11 2510.77 2070.28L2513.02 2071.13ZM2751.66 1546.07C2746.43 1563.48 2728.07 1573.35 2710.65 1568.13C2700.97 1565.22 2693.15 1558.02 2689.46 1548.6C2677.93 1520.47 2664.7 1490.64 2650.63 1464.19C2609.34 1384.58 2559.42 1309.75 2501.76 1241.05C2494.77 1232.58 2491.8 1221.5 2493.6 1210.67C2507.9 1122.42 2512.34 1032.86 2506.83 943.629C2504.01 910.428 2500.64 878.632 2495.85 849.928C2494.3 840.603 2496.86 831.053 2502.89 823.764C2509.32 816.307 2518.65 811.996 2528.5 811.946C2536.72 811.779 2544.69 814.8 2550.73 820.385C2752.47 1003.05 2830.35 1285.9 2750.53 1546.08H2751.66V1546.07Z"
            fill="#F5F5F5"
          />
        </svg>
      </div>
    </>
  )
}