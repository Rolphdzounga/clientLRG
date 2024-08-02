import React, { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
//import { mockDataTeam } from "./mockData";
import ExportExcel from "./excelexport";
import { IconButton, Tooltip } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import RefreshIcon from "@mui/icons-material/Refresh";
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import * as FileSaver from "file-saver";
//import XLSX from "sheetjs-style";
import { useMemo, } from "react";
import {MaterialReactTable} from "material-react-table";


import {
  Box,

  Button,

 // useMediaQuery,
} from "@mui/material";
import Header from "./Header";
import { writeFileXLSX,utils } from "xlsx";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAdherentStore } from "../../../store/store";
import { accountService } from "../../../_services/account.service";

const fileExtension = ".xlsx";
const fileName = "Export Excel";
const exportToExcel = async (excelData) => {
  /* dynamically import the SheetJS Wrapper */
  const wb = utils.book_new();
  const ws = utils.json_to_sheet(excelData);
  utils.book_append_sheet(wb, ws, "data");
  writeFileXLSX(wb, fileName + fileExtension);
};





const User = ({categ,champ,titre,url}) => {
 // const { data, isLoading } = useGetProductsQuery();
 // const isNonMobile = useMediaQuery("(min-width: 1000px)");
  
  const navigate = useNavigate()
 const [validationErrors, setValidationErrors] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  //const [dataTeam, setDataTeam] = useState(mockDataTeam);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  const columns = useMemo(
    () => champ,
    [champ]
  );
const { data, isLoading, isError, refetch, isFetching } = useQuery({
  queryKey: [
    "team",
    columnFilters, //refetch when columnFilters changes
    globalFilter, //refetch when globalFilter changes
    pagination.pageIndex, //refetch when pagination.pageIndex changes
    pagination.pageSize, //refetch when pagination.pageSize changes
    sorting, //refetch when sorting changes
  ],
  queryFn: async () => {
    const fetchURL = new URL(url);
    fetchURL.searchParams.set(
      'start',
      `${pagination.pageIndex * pagination.pageSize}`,
    );
    fetchURL.searchParams.set('size', `${pagination.pageSize}`);
    fetchURL.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
    fetchURL.searchParams.set('globalFilter', globalFilter ?? '');
    fetchURL.searchParams.set('sorting', JSON.stringify(sorting ?? []));

    const response = await fetch(fetchURL.href, { headers: {
      'Authorization': 'Bearer ' + accountService.getToken(),
    }});
    const json = await response.json();
    return json;
  },
  keepPreviousData: true,//Promise.reject("Un problème est survenu. Nous verifions..."), //
   
});

const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
  
  /*if (!Object.keys(validationErrors).length) {
    tableData[row.index] = values;
   fetch(url + "/", {
    method: "PUT",
    headers: {
      'Content-type': "application/json"
    },
    body: JSON.stringify(values)
  }).then(resp => resp.json())
    .then(resp => {

      toast.success(`Mise à jour réussie. ${JSON.stringify(values.username)}`)
      getAgents()
      //resolve()
    }).catch(err=>toast.error(`Echec de mise à jour..`))
    exitEditingMode(); //required to exit editing mode and close modal
  }*/
};

const handleCancelRowEdits = () => {
  setValidationErrors({});
};

const handleDeleteRow = useCallback(
  /*(row) => {
    if (
      !confirmAlert({
        title: 'suppression utilisateur',
        message: `Etes vous sur de vouloir supprimer l' utilisateur ${row.getValue('email')} ?`,
        buttons: [
          {
            label: 'Annuler',
          },
          {
            label: 'Supprimer',
            onClick:async () => {
            await  fetch(url + "/" + row.original.id, {
                method: "delete",
                headers: {
                  'Content-type': "application/json"
                },
              }).then(resp => resp.json())
                .then(resp => {
                  getAgents()
                  notify(`Suppréssion de ${row.getValue('email')} réussie!!!`)
                  //resolve()
                 // exitEditingMode();
                })
                
              //  tableData.splice(row.index, 1);
                //setTableData([...tableData]);
            }
          }      
        ]
      })
    ) {
      return;
    }
    //send api delete request here, then refetch or update local table data for re-render

  },
  [tableData],*/
);
const setAdherent = useAdherentStore((state) => state.setData);
console.log('data_____________',data)
  return (
    <Box m="1.5rem 2.5rem">
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <Header title={titre}  />
      <MaterialReactTable
          columns={columns}
          data={data?.data ?? []}
          initialState={{ showColumnFilters: false ,columnVisibility: { MOTIF: false,
            "Solde Dispo": false,
            Creation: false,
            Compte: false,
            Canal: false,
            "#Credit": false,
            "#Debit": false,
            FICHIER: false, } }}
          manualFiltering
          manualPagination
          manualSorting
          layoutMode="grid"
          enableColumnOrdering
          enableColumnResizing
          enableStickyHeader
          enableColumnActions={false}
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex'}}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() =>{
                  console.log('row____',row.original) 
                  setAdherent(row.original)
                  navigate(`/admin/adherent/edit`)

                }}> {/**table.setEditingRow(row) */}
                  <Edit />
                </IconButton>
              </Tooltip> 
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          localization={MRT_Localization_FR}
          muiTableHeadCellProps={{
            align: "center",
            sx: (theme) => ({
              borderRight: "1px solid rgba(224,224,224,1)",
             // background: theme.palette.text.primary,
              color: '#212E53'//theme.palette.text.secondary,
            }),
          }}
          muiTableBodyCellProps={{
            align: "center",
            sx: {
              borderRight: "1px solid rgba(224,224,224,1)",
            },
          }}
          //enablePagination={true}
          enableRowSelection
          positionToolbarAlertBanner="bottom"
          onColumnFiltersChange={setColumnFilters}
          onGlobalFilterChange={setGlobalFilter}
          onPaginationChange={setPagination}

          onSortingChange={setSorting}
          renderTopToolbarCustomActions={({ table }) => (
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                p: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <Tooltip arrow title="Refresh Data">
                <IconButton onClick={() => refetch()}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
              <ExportExcel excelData={data?.data} fileName={"Excel Export"} />
              <Button
                disabled={
                  !table.getIsSomeRowsSelected() &&
                  !table.getIsAllRowsSelected()
                }
                //only export selected rows
                onClick={() =>
                  exportToExcel(
                    table.getSelectedRowModel().rows.map((row) => row.original)
                  )
                }
                startIcon={<FileDownloadIcon />}
                variant="contained"
              >
                Export Selected Rows
              </Button>
              
            </Box>
          )}
          rowCount={data?.meta?.totalRowCount ?? 0}
          state={{
            columnFilters,
            globalFilter,
            isLoading,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isFetching,
            sorting,
          }}
        />
       
        </div>
    </Box>
  );
};

export default User;
