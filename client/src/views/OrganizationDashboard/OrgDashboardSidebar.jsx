export default function OrganizationDashSideBar({ pages }) {
  let links = [];

  Object.keys(pages).forEach((page) => { links.push(<><a href={"/organizationdashboard" + pages[page][0]} class="org-sidebar-item">{page}</a><br /></>) })
  return (
    <div className='org-sidebar'>
      <h3 >Menu</h3>
      {links}
    </div>
  );
}