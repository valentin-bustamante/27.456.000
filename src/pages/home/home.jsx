import { useCallback, useEffect, useMemo, useState } from "react";
import { Titulo } from "../../components/titulo/titulo";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { MovieForm } from "../../components/Form/Form";
import { Button } from "../../components/Button/Button";
import FilterMovie from "../../components/FilterMovie/FilterMovie";
import { ListSection } from "../../components/ListSection/ListSection";
import { CounterStats } from "../../components/CounterStats/CounterStats";
import { ConfirmDialog } from "../../components/ConfirmDialog/ConfirmDialog";
import styles from "./home.module.css";


const nombreProyecto = "etflix";


const initialArreglo = [
  {
    id: 1,
    type: "Película",
    title: "El señor de los anillos: La comunidad del anillo",
    director: "Peter Jackson",
    year: 2001,
    genre: "Fantasía",
    rating: 8.8,
    viewed: false,
  },
  {
    id: 2,
    type: "Serie",
    title: "Stranger Things",
    director: "Los Duffer",
    year: 2016,
    genre: "Ciencia ficción",
    rating: 8.7,
    viewed: false,
  },
  {
    id: 3,
    type: "Película",
    title: "Inception",
    director: "Christopher Nolan",
    year: 2010,
    genre: "Thriller",
    rating: 8.8,
    viewed: false,
  },
  {
    id: 4,
    type: "Serie",
    title: "Breaking Bad",
    director: "Vince Gilligan",
    year: 2008,
    genre: "Drama",
    rating: 9.5,
    viewed: false,
  },
];



function Home() {
  const [arreglo, setArreglo] = useState(() => {
    const saved = localStorage.getItem("peliculas");
    return saved ? JSON.parse(saved) : initialArreglo;
  });
  const [form, setForm] = useState({
    title: "",
    director: "",
    year: "",
    genre: "Fantasía",
    rating: "",
    type: "Película",
  });
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    genre: "",
  });
  const [sorting, setSorting] = useState({
    sortBy: "",
    order: "asc",
  });

  const resetForm = useCallback(() => {
    setForm({
      title: "",
      director: "",
      year: "",
      genre: "Fantasía",
      rating: "",
      type: "Película",
    });
    setEditingId(null);
    setFormErrors({});
  }, []);


  const openAddModal = useCallback(() => {
    resetForm();
    setIsModalOpen(true);
  }, [resetForm]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }, [formErrors]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const title = form.title.trim();
      const director = form.director.trim();
      const year = parseInt(form.year, 10);
      const rating = Number(form.rating.toString().replace(",", "."));
      const errors = {};

      if (!title) {
        errors.title = "El título es obligatorio.";
      }

      if (!director) {
        errors.director = "El director es obligatorio.";
      }

      if (!form.year.trim()) {
        errors.year = "El año es obligatorio.";
      } else {
        const year = parseInt(form.year.trim(), 10);
        if (Number.isNaN(year)) {
          errors.year = "Ingresa un año válido.";
        } else if (year < 1895 || year > 2026) {
          errors.year = "El año debe estar entre 1895 y 2026.";
        }
      }

      if (!form.rating.toString().trim()) {
        errors.rating = "El rating es obligatorio.";
      } else {
        const rating = Number(form.rating.toString().replace(",", "."));
        if (Number.isNaN(rating)) {
          errors.rating = "Ingresa un rating válido.";
        } else if (rating < 0 || rating > 10) {
          errors.rating = "El rating debe estar entre 0 y 10.";
        }
      }

      setFormErrors(errors);

      if (Object.keys(errors).length > 0) {
        return;
      }

      if (editingId) {
        setArreglo((prev) =>
          prev.map((item) =>
            item.id === editingId
              ? {
                  ...item,
                  title,
                  director,
                  year,
                  genre: form.genre,
                  rating,
                  type: form.type,
                }
              : item,
          ),
        );
        resetForm();
        setIsModalOpen(false);
        return;
      }

      const nuevoItem = {
        id: Date.now(),
        title,
        director,
        year,
        genre: form.genre,
        rating,
        type: form.type,
        viewed: false,
      };

      setArreglo((prev) => [nuevoItem, ...prev]);
      resetForm();
      setIsModalOpen(false);
    },
    [editingId, form, resetForm],
  );

  const handleToggleViewed = useCallback((id) => {
    setArreglo((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, viewed: !item.viewed } : item,
      ),
    );
  }, []);

  const handleEdit = useCallback((item) => {
    setForm({
      title: item.title,
      director: item.director,
      year: item.year,
      genre: item.genre,
      rating: item.rating,
      type: item.type,
    });
    setEditingId(item.id);
    setFormErrors({});
    setIsModalOpen(true);
  }, []);

  const handleDeleteRequest = useCallback((item) => {
    setDeleteTarget(item);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (!deleteTarget) {
      return;
    }

    setArreglo((prev) => prev.filter((item) => item.id !== deleteTarget.id));
    if (editingId === deleteTarget.id) {
      resetForm();
      setIsModalOpen(false);
    }
    setDeleteTarget(null);
  }, [deleteTarget, editingId, resetForm]);

  const handleCancelDelete = useCallback(() => {
    setDeleteTarget(null);
  }, []);

  const handleCancelEdit = useCallback(() => {
    resetForm();
    setIsModalOpen(false);
  }, [resetForm]);

  const handleFilterChange = useCallback((name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSortChange = useCallback((name, value) => {
    setSorting((prev) => ({ ...prev, [name]: value }));
  }, []);

  useEffect(() => {
    localStorage.setItem("peliculas", JSON.stringify(arreglo));
  }, [arreglo]);
  
  

  const filteredItems = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    const baseFiltered = arreglo.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(term) ||
        item.director.toLowerCase().includes(term);
      const matchesType = filters.type === "" || item.type === filters.type;
      const matchesGenre = filters.genre === "" || item.genre === filters.genre;

      return matchesSearch && matchesType && matchesGenre;
    });

    if (!sorting.sortBy) {
      return baseFiltered;
    }

    return [...baseFiltered].sort((a, b) => {
      const valueA = a[sorting.sortBy];
      const valueB = b[sorting.sortBy];

      if (valueA === valueB) {
        return 0;
      }

      return sorting.order === "asc"
        ? valueA - valueB
        : valueB - valueA;
    });
  }, [searchTerm, arreglo, filters, sorting]);

  const porVer = useMemo(() => filteredItems.filter((item) => !item.viewed), [filteredItems]);
  const vistos = useMemo(() => filteredItems.filter((item) => item.viewed), [filteredItems]);

  const total = useMemo(() => arreglo.length, [arreglo]);
  const vistasCount = useMemo(() => arreglo.filter((item) => item.viewed).length, [arreglo]);
  const noVistasCount = useMemo(() => arreglo.filter((item) => !item.viewed).length, [arreglo]);
  const genreCounts = useMemo(
    () =>
      arreglo.reduce((acc, item) => {
        acc[item.genre] = (acc[item.genre] || 0) + 1;
        return acc;
      }, {}),
    [arreglo],
  );

  const noResultsWarning =
    filteredItems.length === 0 &&
    (searchTerm.trim() !== "" || filters.type !== "" || filters.genre !== "" || sorting.sortBy !== "");

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <Titulo texto="Ñetflix" />
      </div>


      <Button
        type="button"
        variant="ghost"
        size="large"
        className={styles.addCard}
        onClick={openAddModal}
      >
        <div className={styles.addCardBody}>
          <div className={styles.addIcon}>+</div>
          <div>
            <div className={styles.addTitle}>Agregar nueva película o serie</div>
            <div className={styles.addSubtitle}>Haz clic para abrir el formulario</div>
          </div>
        </div>
      </Button>

      <div className={styles.searchFilterRow}>
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por título o director..."
        />

        <FilterMovie
          filters={filters}
          sorting={sorting}
          onChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
      </div>

      {noResultsWarning && (
        <div className={styles.noResultsBanner}>
          No hay resultados que coincidan con los filtros.
        </div>
      )}

      {/* Contadores */}
      <CounterStats 
        total={total}
        viewed={vistasCount}
        notViewed={noVistasCount}
        genreCounts={genreCounts}
      />

      <ListSection
        title="Por ver"
        items={porVer}
        emptyText="No hay contsetenido por ver."
        onToggleViewed={handleToggleViewed}
        onEdit={handleEdit}
        onDelete={handleDeleteRequest}
      />

      <ListSection
        title="Vistos"
        items={vistos}
        emptyText="No hay contenido visto."
        onToggleViewed={handleToggleViewed}
        onEdit={handleEdit}
        onDelete={handleDeleteRequest}
      />

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCancelEdit}>
          <div className={styles.modalPanel} onClick={(e) => e.stopPropagation()}>
            <MovieForm
              form={form}
              errors={formErrors}
              onChange={handleChange}
              onSubmit={handleSubmit}
              isEditing={Boolean(editingId)}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Eliminar película o serie"
        message={
          deleteTarget
            ? `¿Seguro que querés eliminar "${deleteTarget.title}"? Esta acción es irreversible.`
            : ""
        }
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default Home;
