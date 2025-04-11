'use client';

import { Table } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

interface Bug {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string,
  updatedAt: string
}

const BugsPage = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBugs() {
      try {
        const response = await fetch('/api/bugs');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBugs(data);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching bugs:', error);
        setError(error.message);
        setLoading(false);
      }
    }

    fetchBugs();
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (loading) {
    return <p>Loading bugs...</p>;
  }

  if (error) {
    return <p>Error loading bugs: {error}</p>;
  }

  return (
    <div>
      <h2>Current Bugs</h2>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created at</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Updated at</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
              {bugs.length && bugs.map((bug: Bug) => (
                <Table.Row>
                  <Table.Cell>{bug.id}</Table.Cell>
                  <Table.Cell>{bug.title}</Table.Cell>
                  <Table.Cell>{bug.description}</Table.Cell>
                  <Table.Cell>{bug.status}</Table.Cell>
                  <Table.Cell>{bug.createdAt}</Table.Cell>
                  <Table.Cell>{bug.createdAt}</Table.Cell>
                </Table.Row>
              ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export default BugsPage;
