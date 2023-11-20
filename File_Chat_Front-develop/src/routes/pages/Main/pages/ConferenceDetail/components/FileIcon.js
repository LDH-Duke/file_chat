const {
  FilePdfOutlined,
  FileImageOutlined,
  FileExcelOutlined,
} = require('@ant-design/icons');

const fileType = [
  {
    type: 'application/pdf',
    value: '',
    icon: <FilePdfOutlined style={{ fontSize: '1.5rem' }} />,
  },
  {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    value: '',
    icon: <FileExcelOutlined style={{ fontSize: '1.5rem' }} />,
  },
  {
    type: 'image/png',
    value: '',
    icon: <FileImageOutlined style={{ fontSize: '1.5rem' }} />,
  },
];

const FileIcon = {
  getFileIcon: (type) => {
    const idx = fileType.findIndex((item) => {
      return item.type === type;
    });
    return fileType[idx];
  },
};
export default FileIcon;
