import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const TeamAnalytics = ({ analytics }) => {
  const departmentColors = [
    '#1E3A5F', '#4A90A4', '#E67E22', '#27AE60', 
    '#E74C3C', '#9B59B6', '#F39C12', '#34495E'
  ];

  const workloadColors = {
    'Low': '#27AE60',
    'Medium': '#F39C12', 
    'High': '#E74C3C'
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-md p-3 shadow-elevation-3">
          <p className="text-sm font-medium text-popover-foreground">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm text-muted-foreground">
              {entry?.name}: {entry?.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Department Distribution */}
      <div className="bg-card border border-border rounded-md p-6 shadow-elevation-1">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Users" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Department Distribution</h3>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={analytics?.departmentDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="count"
              >
                {analytics?.departmentDistribution?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={departmentColors?.[index % departmentColors?.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          {analytics?.departmentDistribution?.map((dept, index) => (
            <div key={dept?.name} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: departmentColors?.[index % departmentColors?.length] }}
              />
              <span className="text-muted-foreground">{dept?.name}</span>
              <span className="font-medium text-foreground ml-auto">{dept?.count}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Workload Distribution */}
      <div className="bg-card border border-border rounded-md p-6 shadow-elevation-1">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Workload Distribution</h3>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics?.workloadDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="range" 
                tick={{ fontSize: 12, fill: '#7F8C8D' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#7F8C8D' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="count" 
                radius={[4, 4, 0, 0]}
                fill="#4A90A4"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          {analytics?.workloadDistribution?.map((item) => (
            <div key={item?.range} className="text-center">
              <div className="text-2xl font-bold text-foreground">{item?.count}</div>
              <div className="text-sm text-muted-foreground">{item?.range}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Performance Metrics */}
      <div className="bg-card border border-border rounded-md p-6 shadow-elevation-1">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Performance Metrics</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="Target" size={16} className="text-success" />
              <span className="text-sm font-medium text-foreground">Average Performance</span>
            </div>
            <span className="text-lg font-bold text-success">{analytics?.averagePerformance}%</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Avg. Response Time</span>
            </div>
            <span className="text-lg font-bold text-primary">{analytics?.averageResponseTime}h</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-medium text-foreground">Completion Rate</span>
            </div>
            <span className="text-lg font-bold text-success">{analytics?.completionRate}%</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-secondary" />
              <span className="text-sm font-medium text-foreground">Team Satisfaction</span>
            </div>
            <span className="text-lg font-bold text-secondary">{analytics?.teamSatisfaction}/5</span>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-md p-6 shadow-elevation-1">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Activity" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        </div>

        <div className="space-y-3">
          {analytics?.recentActivity?.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 hover:bg-muted rounded-md transition-smooth">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                activity?.type === 'assignment' ? 'bg-primary' :
                activity?.type === 'completion' ? 'bg-success' :
                activity?.type === 'update' ? 'bg-warning' : 'bg-muted-foreground'
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{activity?.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity?.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamAnalytics;