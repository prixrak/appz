import { FC } from 'react';
import { useStyles } from './GuardTeam.styles';
import { useGuardTeam } from './hooks/useGuardTeam';
import { Table } from './../../components/Table/Table';

const GuardTeam: FC = () => {
  const tableHeaders = [{ title: 'Team' }, { title: 'Full name' }, { title: 'Email' }, { title: 'Phone number' }];

  const styles = useStyles();
  const guardTeams = useGuardTeam();

  const tableContent =
    guardTeams.data &&
    guardTeams.data.map((guardTeam) => {
      const { name, members } = guardTeam;

      return members.map((member) => (
        <tr key={name} className={styles.tableDataRow}>
          <td onClick={(e) => e.stopPropagation()}>{name}</td>

          <td>{member.name + '' + member.surname}</td>
          <td>{member.email}</td>
          <td>{member.phoneNumber}</td>
        </tr>
      ));
    });

  return (
    <div>
      <Table
        isDataLoading={false}
        tableHeaders={tableHeaders}
        customStyles={{ tableHeaderRow: styles.tableHeaderRow, tableDataRow: styles.tableDataRow }}
      >
        {tableContent}
      </Table>
    </div>
  );
};

export default GuardTeam;
