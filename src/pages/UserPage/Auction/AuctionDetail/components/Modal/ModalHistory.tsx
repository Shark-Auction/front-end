import { Avatar, Button, Modal, Table, TableProps } from "antd";
import { useState } from "react";

interface BidHistoryProps {
  id: number;
  name: string;
  dateBidding: string;
  money: number;
}

export const ModalHistory = () => {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const userList = [
    {
      id: 1,
      name: "Username1",
      money: 100000,
      dateBidding: "14/09/2024",
    },
    {
      id: 2,
      name: "Username2",
      money: 100000,
      dateBidding: "14/09/2024",
    },
    {
      id: 3,
      name: "Username3",
      money: 100000,
      dateBidding: "14/09/2024",
    },
    {
      id: 4,
      name: "Username4",
      money: 100000,
      dateBidding: "14/09/2024",
    },
    {
      id: 5,
      name: "Username5",
      money: 100000,
      dateBidding: "14/09/2024",
    },
  ];
  const column: TableProps<BidHistoryProps>["columns"] = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Time bidding",
      dataIndex: "dateBidding",
      key: "dateBidding",
    },
    {
      title: "Amount bidding",
      dataIndex: "money",
      key: "money",
    },
  ];
  return (
    <>
      <div className="border-2 w-full rounded-sm border-gray-300 flex flex-col gap-5 px-10 py-5">
        {userList.slice(0, 3).map((element) => (
          <div className="flex items-center gap-5">
            <div className="w-fit">
              <Avatar className="w-10 h-10 md:w-14 md:h-14" />
            </div>
            <div className="flex justify-between w-3/4">
              <p className="md:text-xl">{element.name}</p>
              <p className="md:text-xl">{element.money}</p>
            </div>
          </div>
        ))}
        <div className="w-full text-center">
          <Button onClick={openModal} type="link" className="md:text-xl">
            View more...
          </Button>
        </div>
      </div>
      <Modal
        open={open}
        onCancel={closeModal}
        title={<p className="md:text-xl">Bidding History</p>}
        footer={[<Button onClick={closeModal}>Close</Button>]}
      >
        <Table columns={column} dataSource={userList} />
      </Modal>
    </>
  );
};
