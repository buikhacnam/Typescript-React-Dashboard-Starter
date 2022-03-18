import { Breadcrumb } from 'antd'
import styled from 'styled-components'
const mapToTitle: any = {
	working: 'Công việc',
	lead: 'Lead',
	schedule: 'Lịch hẹn',
	customer: 'Khách hàng 360',
	'customer-info': 'Khách hàng 360',
	'customer-products': 'Khách hàng 360',
	'customer-tickets': 'Khách hàng 360',
	project: 'Quản lí dự án',
	campaign: 'Quản lí chiến dịch',
}
export const RenderBreadcrumb = ({ pathname }: any) => {
	const arrPath: any = pathname.split('/').filter((item: any) => item)

	return (
		<BreadcrumbStyled
			style={{ margin: '16px 24px', marginBottom: 0 }}
			separator='>'
		>
			{arrPath.map((path: string) => {
				return (
					<>
						<Breadcrumb.Item key={path}>
							{mapToTitle[path]
								? mapToTitle[path]
								: path[0].toUpperCase() + path.slice(1)}
						</Breadcrumb.Item>
					</>
				)
			})}
		</BreadcrumbStyled>
	)
}
const BreadcrumbStyled = styled(Breadcrumb)`
	.ant-breadcrumb-separator {
		margin: 0 23px;
	}
`
