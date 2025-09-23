import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EmployeeTable = ({ employees, onEditEmployee, onAssignOrder, onViewEmployee }) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedEmployees = [...employees]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];

    if (typeof aValue === 'string') {
      aValue = aValue?.toLowerCase();
      bValue = bValue?.toLowerCase();
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-success text-success-foreground';
      case 'On Leave':
        return 'bg-warning text-warning-foreground';
      case 'Inactive':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getWorkloadColor = (workload) => {
    if (workload >= 90) return 'text-destructive';
    if (workload >= 70) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="bg-card border border-border rounded-md overflow-hidden shadow-elevation-1">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span>Employee</span>
                  <Icon 
                    name={sortField === 'name' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('role')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span>Role & Department</span>
                  <Icon 
                    name={sortField === 'role' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Contact</th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('activeAssignments')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span>Assignments</span>
                  <Icon 
                    name={sortField === 'activeAssignments' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('workloadPercentage')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span>Workload</span>
                  <Icon 
                    name={sortField === 'workloadPercentage' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span>Status</span>
                  <Icon 
                    name={sortField === 'status' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-right p-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedEmployees?.map((employee) => (
              <tr key={employee?.id} className="hover:bg-muted/50 transition-smooth">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={employee?.avatar}
                        alt={employee?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{employee?.name}</div>
                      <div className="text-sm text-muted-foreground">ID: {employee?.employeeId}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <div className="font-medium text-foreground">{employee?.role}</div>
                    <div className="text-sm text-muted-foreground">{employee?.department}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm">
                    <div className="text-foreground">{employee?.email}</div>
                    <div className="text-muted-foreground">{employee?.phone}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm">
                    <div className="font-medium text-foreground">{employee?.activeAssignments} Active</div>
                    <div className="text-muted-foreground">{employee?.completedAssignments} Completed</div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          employee?.workloadPercentage >= 90 ? 'bg-destructive' :
                          employee?.workloadPercentage >= 70 ? 'bg-warning' : 'bg-success'
                        }`}
                        style={{ width: `${employee?.workloadPercentage}%` }}
                      />
                    </div>
                    <span className={`text-sm font-medium ${getWorkloadColor(employee?.workloadPercentage)}`}>
                      {employee?.workloadPercentage}%
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee?.status)}`}>
                    {employee?.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewEmployee(employee)}
                      iconName="Eye"
                      iconSize={16}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditEmployee(employee)}
                      iconName="Edit"
                      iconSize={16}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onAssignOrder(employee)}
                      iconName="UserPlus"
                      iconSize={16}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-border">
        {sortedEmployees?.map((employee) => (
          <div key={employee?.id} className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={employee?.avatar}
                    alt={employee?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium text-foreground">{employee?.name}</div>
                  <div className="text-sm text-muted-foreground">{employee?.role}</div>
                  <div className="text-xs text-muted-foreground">{employee?.department}</div>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee?.status)}`}>
                {employee?.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-muted-foreground">Contact</div>
                <div className="text-foreground">{employee?.phone}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Assignments</div>
                <div className="text-foreground">{employee?.activeAssignments} Active</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Workload</span>
                <span className={`font-medium ${getWorkloadColor(employee?.workloadPercentage)}`}>
                  {employee?.workloadPercentage}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    employee?.workloadPercentage >= 90 ? 'bg-destructive' :
                    employee?.workloadPercentage >= 70 ? 'bg-warning' : 'bg-success'
                  }`}
                  style={{ width: `${employee?.workloadPercentage}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewEmployee(employee)}
                iconName="Eye"
                iconPosition="left"
                iconSize={14}
              >
                View
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onAssignOrder(employee)}
                iconName="UserPlus"
                iconPosition="left"
                iconSize={14}
              >
                Assign
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeTable;