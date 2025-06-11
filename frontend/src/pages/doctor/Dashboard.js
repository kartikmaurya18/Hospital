import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  UserGroupIcon, 
  CalendarIcon, 
  ClipboardDocumentListIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';

const DoctorDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Today\'s Appointments',
      value: '8',
      change: '+2',
      icon: CalendarIcon,
    },
    {
      title: 'Total Patients',
      value: '156',
      change: '+12',
      icon: UserGroupIcon,
    },
    {
      title: 'Pending Reports',
      value: '5',
      change: '-2',
      icon: ClipboardDocumentListIcon,
    },
    {
      title: 'Average Wait Time',
      value: '15 min',
      change: '-5 min',
      icon: ClockIcon,
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back, Dr. {user?.name}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.title}
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <span className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500"> from yesterday</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Today's Schedule
            </h3>
          </CardHeader>
          <CardContent>
            <div className="flow-root">
              <ul role="list" className="-mb-8">
                {/* Add schedule items here */}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Quick Actions
            </h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                View Patients
              </Button>
              <Button variant="outline" className="w-full">
                Medical Records
              </Button>
              <Button variant="outline" className="w-full">
                Write Prescription
              </Button>
              <Button variant="outline" className="w-full">
                Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorDashboard; 