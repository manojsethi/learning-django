import { Modal, Form, Input, Checkbox, Button } from "antd";
import { Task } from "../../pages/tasks";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import axiosInstance from "../../config/axios.config";

type TaskModalProps = {
  handleTaskSuccess: () => void;
  handleClose: () => void;
  initialData?: Task;
  open?: boolean;
};

function TaskModal(props: TaskModalProps) {
  const { handleTaskSuccess, handleClose, initialData, open } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = useForm();

  const handleFinish = async (values: Task) => {
    setIsLoading(true);
    try {
      if (props.initialData) {
        await axiosInstance.put(`/tasks/${values.id}`, values, {
          data: values,
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        await axiosInstance.post("/tasks/create", values, {
          data: values,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      handleTaskSuccess();
    } catch (error) {}
    setIsLoading(false);
  };

  useEffect(() => {
    return () => form.resetFields();
  }, []);

  return (
    <Modal
      title={`${initialData ? "Update" : "Create"} task`}
      open={open}
      closable={true}
      onCancel={handleClose}
      footer={null}
      destroyOnClose={true}
    >
      <Form
        form={form}
        onFinish={handleFinish}
        initialValues={
          initialData
            ? {
                ...initialData,
                isCompleted: initialData?.isCompleted ?? false,
              }
            : undefined
        }
        onFinishFailed={(err) => {
          console.log(err, "err");
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <div>
            <label>Title</label>
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: "Title is required!",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </div>
          {initialData && (
            <div>
              <div>
                <Form.Item name={"id"}></Form.Item>
              </div>
              <label>Is Completed</label>
              <Form.Item name="isCompleted" valuePropName="checked" rules={[]}>
                <Checkbox />
              </Form.Item>
            </div>
          )}
          <Button
            htmlType="submit"
            type="primary"
            loading={isLoading}
            disabled={isLoading}
          >
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default TaskModal;
