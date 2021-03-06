require.config({paths:{echarts:"http://echarts.baidu.com/build/dist"}}),require(["echarts","echarts/chart/pie","echarts/chart/line"],function(a){function b(){var b={color:r,tooltip:{trigger:"item",formatter:"{a}：{d}%<br/>{b}<br/>点击显示波动数据"},calculable:!0};p=a.init(document.getElementById("root-tree-pie")),p.setOption(b),p.on("click",function(a){o[a.dataIndex]&&f(o[a.dataIndex].pathid,o[a.dataIndex].method).done(function(a){g(a)})})}function c(){var b={color:r,tooltip:{trigger:"axis"},yAxis:[{type:"value"}],dataZoom:{show:!0}};q=a.init(document.getElementById("show-detail")),q.setOption(b)}function d(a){return a||(a="#"),$.ajax({url:l+"/trace/method-tree?begin="+m+"&end="+n+"&pathid="+a}).done(function(a){a.length&&(o=a)})}function e(a){var b=[{name:"运行时间占比",type:"pie",data:[]}];$.each(a,function(a,c){b[0].data[a]={name:c.text,value:c.cost}}),p.setSeries(b)}function f(a,b){return $.ajax({url:l+"/trace/method-stack?begin="+m+"&end="+n+"&pathid="+a+"&method="+b}).done(function(){})}function g(a){var b=[];$.each(a.series,function(a,c){b[a]={name:c.name,data:c.data,type:"line",smooth:!0,show:!0,itemStyle:{show:!0,normal:{areaStyle:{type:"default"}}}}});var d=[];$.each(b,function(a){d[a]=b[a].name}),c();var e=q.getOption();e.legend={data:d},e.xAxis=[{type:"category",boundaryGap:!1,data:a.times}],q.setOption(e,!0),q.setSeries(b)}function h(a){d(a).done(function(a){a.length&&(e(a),i(a))})}function i(a,b){if(arguments.length<2)b=0;else if(b>=a.length)return;f(a[b].pathid,a[b].method).done(function(c){c.times.length?g(c):(b++,i(a,b))})}function j(){$("#root-tree").jstree({core:{data:{url:l+"/trace/method-tree?begin="+m+"&end="+n+"&pathid=#",data:function(a){return{pathid:a.id,method:a.method}}}}}).on("changed.jstree",function(a,b){h(b.node.id)})}function k(a,b){a&&(m=a),b&&(n=b),$("#beginTime").val(m),$("#endTime").val(n),window.localStorage.setItem("beginTime",m),window.localStorage.setItem("endTime",n)}var l="http://trace.avoscloud.com",m=window.localStorage.getItem("beginTime")||"201410241500",n=window.localStorage.getItem("endTime")||"201410241800",o=[];$.ajaxSetup({xhrFields:{withCredentials:!0}});var p,q,r=["#2ec7c9","#b6a2de","#5ab1ef","#ffb980","#d87a80","#8d98b3","#e5cf0d","#97b552","#95706d","#dc69aa","#07a2a4","#9a7fd1","#588dd5","#f5994e","#c05050","#59678c","#c9ab00","#7eb00a","#6f5553","#c14089"];$("#updateDataBtn").on("click",function(){var a=$("#beginTime").val(),b=$("#endTime").val();k(a,b),h()}),j(),b(),h(),k()});