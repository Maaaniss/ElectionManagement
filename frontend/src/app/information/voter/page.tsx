'use client';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

interface VoterData {
  aadharId: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  gender: string;
  dob: string;
  age: string;
  state: string;
  phoneNumber: string;
  constituencyName: string;
  pollingBoothId: string;
  voterId: string;
}

export default function Registration() {
  const [data, setData] = useState<VoterData | null>(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const aadhar_id = user.aadhar_id;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://127.0.0.1:5000/getvoterinformation?aadharId=${aadhar_id}`);
      const data: VoterData = await response.json();
      setData(data);
    };

    fetchData();
  }, [aadhar_id]);

  return (
    <div className="bg-white text-black">
      <Head>
        <title>ELECTORAL DB</title>
      </Head>
      <Navbar />
      <div className="w-full max-w-screen-xl mx-auto pb-96">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-6">Aadhar ID</th>
              <th className="px-6">First Name</th>
              <th className="px-6">Middle Name</th>
              <th className="px-6">Last Name</th>
              <th className="px-6">Gender</th>
              <th className="px-6">DOB</th>
              <th className="px-6">Age</th>
              <th className="px-6">State</th>
              <th className="px-6">Phone Number</th>
              <th className="px-6">Constituency Name</th>
              <th className="px-6">Polling Booth ID</th>
              <th className="px-6">Voter ID</th>
            </tr>
          </thead>
          <tbody>
            {data && (
              <tr>
                <td>{data.aadharId}</td>
                <td>{data.firstName}</td>
                <td>{data.middleName}</td>
                <td>{data.lastName}</td>
                <td>{data.gender}</td>
                <td>{data.dob}</td>
                <td>{data.age}</td>
                <td>{data.state}</td>
                <td>{data.phoneNumber}</td>
                <td>{data.constituencyName}</td>
                <td>{data.pollingBoothId}</td>
                <td>{data.voterId}</td>
              </tr>
            )}
          </tbody>
        </table>
        <Link legacyBehavior href="/update/voter">
          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Update
          </button>
        </Link>
        <Link legacyBehavior href="/update/voter">
          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Delete
          </button>
        </Link>
      </div>
    </div>
  );
}